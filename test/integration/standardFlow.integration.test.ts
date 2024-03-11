import describeFlowTest from '@framework/describeFlowTest'
import verify from '@framework/verify'
import userInteraction from '@framework/userInteraction'
import { CountryCode } from '../../src/checkin/model/Schema'
import { RequestData } from '@http/Request'
import { Builder } from 'builder-pattern'

describeFlowTest('Testing Standard checkin Flow', (app) => {
  const country: CountryCode = 'US'

  it('should reject if userId does not match', async () => {
    const userId = '123'
    const sessionId = await userInteraction.initSession(app, country, { userId })
    const sessionInformation = { sessionId, country }

    const response = await userInteraction.continue(app, sessionInformation, { userId: 'wrongId' })
    verify.status.rejected(response)
  })

  it(`should be asked to provide passport number when sending no passport information for ${country}`, async () => {
    const sessionId = await userInteraction.initSession(app, country)
    const sessionInformation = { sessionId, country }

    const response = await userInteraction.continue(app, sessionInformation)
    verify.userInformation.requiredField('passport_number', response)
  })

  it('should be asked the get extra passengers information step if more than one passenger', async () => {
    const sessionId = await userInteraction.initSessionWithPassportAndExtraPassengers(app, country)

    const sessionInformation = { sessionId, country }

    const response = await userInteraction.continue(app, sessionInformation)

    verify.userInformation.requiredField('extra_passenger_information', response)
  })

  it('should be asked to sign the legal agreement before completing the check in', async () => {

    const sessionId = await userInteraction.initSession(app, country)
    const sessionInformation = { sessionId, country }

    const requestDataWithPassportAndExtraPassengersInfo = buildRequestDataWithPassportAndExtraPassengerInfo()

    const response = await userInteraction.continue(app, sessionInformation, requestDataWithPassportAndExtraPassengersInfo)
    verify.userInformation.requiredField('agreement_required', response)
  })

  it('should complete the checkin', async () => {
    const sessionId = await userInteraction.initSession(app, country)
    const sessionInformation = { sessionId, country }

    const requestDataWithPassportAndExtraPassengersInfo = buildRequestDataWithPassportAndExtraPassengerInfo()

    let response = await userInteraction.continue(app, sessionInformation, requestDataWithPassportAndExtraPassengersInfo)
    verify.userInformation.requiredField('agreement_required', response)

    response = await userInteraction.signLegalAgreement(app, sessionInformation)
    verify.status.completed(response)
  })

})

function buildRequestDataWithPassportAndExtraPassengerInfo(): RequestData {
  return Builder<RequestData>().fields({ passport_number: 'G123', extra_passenger_information: [{ name: 'Tomás', passport: 'G123' }, { name: 'Alejandra', passport: 'G123' }] }).passengers(3).build()
}
