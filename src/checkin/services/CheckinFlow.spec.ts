import FlowExecuterMock from '@testMocks/services/FlowExecuterMock'
import CheckinFlow from './CheckInFlow'
import { SessionManager } from './sessionManager'
import generateSessionManagerMock from '@testMocks/repositories/sessionManager.mock'
import { RequestData } from '@http/Request'
import generateRequestDataMock from '@testMocks/model/RequestData.mock'

const NUMBER_OF_STEPS = 5

describe('[ Services / CheckInFlow ]', () => {

  let flowExecuterMock: FlowExecuterMock
  let sessionManager: SessionManager
  let requestData: RequestData

  beforeEach(() => {
    flowExecuterMock = new FlowExecuterMock()
    sessionManager = generateSessionManagerMock()
    requestData = generateRequestDataMock()

  })

  it('should call flowExecuter with the correct steps', async () => {
    const expectedSteps = [
      'ValidateSessionStep',
      'PassportInformationStep',
      'ValidateVisaStep',
      'AgreementSignStep',
      'CompleteCheckinStep'
    ]
    const checkinFlow = new CheckinFlow(sessionManager)
    jest.spyOn(flowExecuterMock, 'and')

    await checkinFlow.checkIn(flowExecuterMock, requestData)

    expect(flowExecuterMock.and).toHaveBeenCalledTimes(NUMBER_OF_STEPS)
    expect(flowExecuterMock.getStepsExecution()).toEqual(expectedSteps)
  })
})
