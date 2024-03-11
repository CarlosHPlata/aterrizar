import { MockContext } from '@testMocks/model/Context.mock'
import { Context } from '../../../model/Context'
import GetExtraPassengerInformationStep from './GetExtraPassengerInformationStep'
import ExtraPassengerInformation from '../../../model/session/ExtraPassengerInformation'
import random from '../../../../../util/random'

describe('[ Step / GetExtraPassengerInformationStep ]', () => {
  const step = new GetExtraPassengerInformationStep()

  describe('Test when it should be execute', () => {
    it('should execute when passengers are more than one and extra passengers info not defined in session data', () => {

      const context = wireContextMockWithNumberOfPassengersInSessionData(2)

      expect(step.when(context)).toBeTruthy()
    })

    it('should not execute when there is only one passenger or extra passengers info is defined in session data', () => {
      const context = wireContextMockWithNumberOfPassengersInSessionData(1)

      expect(step.when(context)).toBeFalsy()
    })
  })

  describe('Test at execution', () => {
    let context: Context
    beforeEach(() => { context = wireContextMockWithNumberOfPassengersInSessionData(2) })

    it('should request the extra passengers information', async () => {
      wireContextMockWithNullExtraPassengerInformationInRequest(context)

      const response = await step.onExecute(context)

      expect(response).toBeFalsy()
      expect(context.getResponse().requiredFiles?.extra_passenger_information).toBeNull()
      expect(context.getSession().data.extra_passenger_information).toBeUndefined()
    })

    it('should request the exact amount of extra passengers information', async () => {
      wireContextMockWithAmountOfExtraPassengersInformationInRequest(0, context)

      const response = await step.onExecute(context)

      expect(response).toBeFalsy()
      expect(context.getResponse().requiredFiles?.extra_passenger_information).toBeNull()
      expect(context.getSession().data.extra_passenger_information).toBeUndefined()
    })

    it('should set the extra passenger information in session if it is given by the user', async () => {
      wireContextMockWithAmountOfExtraPassengersInformationInRequest(1, context)
      const mockExtraPassengerInformation = context.getRequest().fields?.extra_passenger_information as ExtraPassengerInformation[]

      const response = await step.onExecute(context)

      expect(response).toBeTruthy()
      expect(context.getSession().data.extra_passenger_information).toBe(mockExtraPassengerInformation)
    })
  })
})

function wireContextMockWithNumberOfPassengersInSessionData(numberOfPassengers: number, context = new MockContext()): Context {
  const { country, flights, agreementSigned } = context.getSession().data

  context.withSessionBuilder(sessionBuilder => sessionBuilder
    .data({
      country,
      flights,
      passengers: numberOfPassengers,
      agreementSigned
    })
  )
  return context
}

function wireContextMockWithNullExtraPassengerInformationInRequest(context = new MockContext()): Context {
  context.withRequestBuilder(requestBuilder => requestBuilder.fields({ extra_passenger_information: null }))

  return context
}

function wireContextMockWithAmountOfExtraPassengersInformationInRequest(amountOfExtraPassengersInformation: number, context = new MockContext()): Context {
  const mockExtraPassengerInformation = buildMockExtraPassengerInformation(amountOfExtraPassengersInformation)

  context.withRequestBuilder(requestBuilder => requestBuilder.fields({ extra_passenger_information: mockExtraPassengerInformation }))

  return context
}

function buildMockExtraPassengerInformation(amountOfExtraPassengersInformation: number): ExtraPassengerInformation[] {
  const mockExtraPassengerInformation: ExtraPassengerInformation[] = []

  for (let i = 0; i < amountOfExtraPassengersInformation; i++) {
    const extraPassengerInformation = {
      name: random.getRandomName(),
      passport: random.getRandomPassport()
    }
    mockExtraPassengerInformation.push(extraPassengerInformation)
  }

  return mockExtraPassengerInformation
}
