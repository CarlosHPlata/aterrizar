import { MockContext } from '@testMocks/model/Context.mock'
import RequestSeatsStep from './RequestSeatsStep'
import { Context } from '../../../model/Context'
import { SeatInformation } from '../../../model/session/FlightData'

describe('[ Step / RequestSeatsStep ]', () => {
  const step = new RequestSeatsStep()

  describe('Test when it should be execute', () => {
    it('should return true when seats has not been signed', () => {
      const context: Context = wireContextMockWithSeatsInSession([])
      const result = step.when(context)

      expect(result).toBeTruthy()
    })

    it('should return false when seats is signed', () => {
      const context: Context = wireContextMockWithSeatsInSession([{ seatNumber: '1', flight: 'ABC123' }, { seatNumber: '1', flight: 'XYZ456' }])
      const result = step.when(context)

      expect(result).toBeFalsy()
    })
  })

  describe('Testing at execution', () => {
    it('should filled seats', async () => {
      const context = new MockContext()
      const response = step.onExecute(context)
      expect(response).toBeTruthy()
    })

    it('should request the seat to the user if it is not signed', async () => {
      const context: Context = wireContextMockWithSeatsInSession([])
      context.withRequestBuilder(requestBuilder => requestBuilder
        .fields({ seats_required: null })
      )

      const result = await step.onExecute(context)
      expect(result).toBeFalsy()
      expect(context.getResponse().requiredFiles?.seats_required).toBeNull()
    })
  })
})

function wireContextMockWithSeatsInSession(seatsSigned: SeatInformation[]): Context {
  const context: Context = new MockContext()
  context.withSessionBuilder(sessionBuilder => sessionBuilder
    .data({
      country: context.getSession().data.country,
      flights: context.getSession().data.flights,
      passengers: context.getSession().data.passengers,
      seats: seatsSigned
    })
  )

  return context
}
