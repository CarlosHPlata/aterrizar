import FlowExecuterMock from '@testMocks/services/FlowExecuterMock'
import CheckinFlow from './CheckInFlow'
import { SessionManager } from './sessionManager'
import generateSessionManagerMock from '@testMocks/repositories/sessionManager.mock'
import { RequestData } from '@http/Request'
import generateRequestDataMock from '@testMocks/model/RequestData.mock'

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
      'RequestSeatsStep',
      'CaptureSeatsStep',
      'AgreementSignStep',
      'CompleteCheckinStep'
    ]
    const checkinFlow = new CheckinFlow(sessionManager)
    jest.spyOn(flowExecuterMock, 'and')

    await checkinFlow.checkIn(flowExecuterMock, requestData)
    const expectedNumberOfAddedSteps = expectedSteps.length
    expect(flowExecuterMock.and).toHaveBeenCalledTimes(expectedNumberOfAddedSteps)
    expect(flowExecuterMock.getStepsExecution()).toEqual(expectedSteps)
  })
})
