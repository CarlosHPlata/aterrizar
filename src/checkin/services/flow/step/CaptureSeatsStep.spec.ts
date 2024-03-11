import { MockContext } from '@testMocks/model/Context.mock'
import { Context } from '../../../model/Context'
import CaptureSeatsInfoStep from './CaptureSeatsStep'
import { SeatInformation } from '../../../model/session/FlightData'

describe('[ Step / CapturetSeatsStep ]', () => {
  const step = new CaptureSeatsInfoStep()

  describe('Test when it should be execute', () => {
    it('should return true when the number of assigned seats is equal to the number of required assigned seats', () => {
      const context: Context = new MockContext()
      context.withRequestBuilder(requestBuilder => requestBuilder
        .fields({ seats_required: 1 })
        .seat([{ seatNumber: '1', flight: 'ABC123' }]))
      expect(context.getRequest().seat?.length).toBe(context.getRequest().fields?.seats_required as number)
    })

    it('should return true when the seats that were assigned are sent to the session.', async () => {
      const context: Context = wireContextMock([])
      const response = await step.onExecute(context)

      expect(response).toBeTruthy()
      expect(context.getSession().data.seats).toStrictEqual(context.getRequest().seat)
    })
  })
})

function wireContextMock(seatsSigned: SeatInformation[]): Context {
  const context: Context = new MockContext()
  context.withSessionBuilder(sessionBuilder => sessionBuilder
    .data({
      country: context.getSession().data.country,
      flights: context.getSession().data.flights,
      passengers: context.getSession().data.passengers,
      seats: seatsSigned
    })
  ).withRequestBuilder(requestBuilder => requestBuilder
    .fields({ seats_required: 1 })
    .seat([{ seatNumber: '1', flight: 'ABC123' }])
  )
  return context
}
