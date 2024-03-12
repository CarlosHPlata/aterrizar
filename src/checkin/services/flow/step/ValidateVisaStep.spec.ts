import { MockContext } from '@testMocks/model/Context.mock'
import { Context } from '../../../model/Context'
import ValidateVisaStep from './ValidateVisaStep'

describe('[ Step / ValidateVisaStep ]', () => {
  const step = new ValidateVisaStep()

  describe('Test when it should be execute', () => {
    it('should not execute when they are not flying to the US', () => {
      const context: Context = new MockContext()
      context.withSessionBuilder(sessionBuilder => sessionBuilder
        .data({
          ...context.getSession().data,
          country: 'MX',
          flights:
          [
            {
              flightNumber: 'GB123',
              price: 500,
              from: {
                name: 'CH',
                country: 'MX'
              },
              to: {
                name: 'MAN',
                country: 'GB'
              }
            }
          ]
        })
      )
      expect(step.when(context)).toBeFalsy()
    })
    it('should not execute when they are from a visa waiver country', () => {
      const context: Context = new MockContext()
      context.withSessionBuilder(sessionBuilder => sessionBuilder
        .data({ ...context.getSession().data, country: 'US' })
      )
      expect(step.when(context)).toBeFalsy()
    })
    it('should not execute when visa is set in session user information and they are not from a visa waiver country', () => {
      const context: Context = new MockContext()
      context.withSessionBuilder(sessionBuilder => sessionBuilder
        .data({ ...context.getSession().data, country: 'MX' })
        .userInformation({ ...context.getSession().userInformation, visaNo: 'V123' })
      )

      expect(step.when(context)).toBeFalsy()
    })

    it('should execute when visa is not set in session user information and they are not from a visa waiver country', () => {
      const context: Context = new MockContext()
      context.withSessionBuilder(sessionBuilder => sessionBuilder
        .data({ ...context.getSession().data, country: 'MX' })
        .userInformation({ ...context.getSession().userInformation, visaNo: undefined })
      )

      expect(step.when(context)).toBeTruthy()
    })

    it('should not execute when visa is not set in session user information but they are from a visa waiver country', () => {
      const context: Context = new MockContext()
      context.withSessionBuilder(sessionBuilder => sessionBuilder
        .data({ ...context.getSession().data, country: 'US' })
        .userInformation({ ...context.getSession().userInformation, visaNo: undefined })
      )

      expect(step.when(context)).toBeFalsy()
    })
  })

  describe('Test when executed', () => {
    it('should request to the user the visa field if its not sent', async () => {
      const context: Context = new MockContext()
      context.withRequestBuilder(requestBuilder => requestBuilder
        .fields({ visa_number: undefined })
      )
      const response = await step.onExecute(context)
      expect(response).toBeFalsy()
      expect(context.getResponse().requiredFiles?.visa_number).toBeNull()
    })

    it('should save the visa in session if its sent by the user', async () => {
      const visaNo = 'V123'
      const context: Context = new MockContext()
      context.withRequestBuilder(requestBuilder => requestBuilder
        .fields({ visa_number: visaNo })
      )
      const response = await step.onExecute(context)
      expect(response).toBeTruthy()
      expect(context.getSession().userInformation?.visaNo).toBe(visaNo)
    })
  })
})
