import describeFlowTest from '@framework/describeFlowTest'
import verify from '@framework/verify'
import userInteraction from '@framework/userInteraction'
import { CountryCode } from '../../src/checkin/model/Schema'

describeFlowTest('Testing Standard checkin Flow', (app) => {
  const country: CountryCode = 'MX'
  const fields = { passport_number: 'G123', visa_number: 'V123' }

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

  it('it should be asked to provide Visa number when flying to a country that requires a visa', async () => {
    const sessionId = await userInteraction.initSessionWithPassport(app, country)
    const sessionInformation = { sessionId, country }
    const response = await userInteraction.continue(app, sessionInformation)
    verify.userInformation.requiredField('visa_number', response)
  })

  it('should be asked to sign the legal agreement before completing the check in', async () => {
    const sessionId = await userInteraction.initSessionWithVisa(app, country)
    const sessionInformation = { sessionId, country }
    const response = await userInteraction.continue(app, sessionInformation, { fields })
    verify.userInformation.requiredField('agreement_required', response)
  })

  it('should complete the checkin', async () => {
    const sessionId = await userInteraction.initSessionWithVisa(app, country)
    const sessionInformation = { sessionId, country }

    let response = await userInteraction.continue(app, sessionInformation, { fields })
    verify.userInformation.requiredField('agreement_required', response)

    response = await userInteraction.signLegalAgreement(app, sessionInformation)
    verify.status.completed(response)
  })

})
