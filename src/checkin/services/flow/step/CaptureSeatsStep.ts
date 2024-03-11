import { Context } from '../../../model/Context'
import { Builder } from 'builder-pattern'
import { SessionData } from '../../../model/session/SessionData'
import StepTemplate from '../StepTemplate'

export default class CaptureSeatsStep extends StepTemplate {
  when(context: Context): boolean {
    const session = context.getSession()
    return (!session.data.seats ?? false)
  }

  onExecute(context: Context): Promise<boolean> {
    const session = context.getSession()
    const requestData = context.getRequest()
    const amountSeats = requestData.fields?.seats_required as number

    if (amountSeats !== requestData?.seat?.length) {
      context = context.withResponseBuilder((responseBuilder) => responseBuilder
        .status('seats_assignation_required')
        .requiredFiles({ seats_required: null })
      )
      return Promise.resolve(false)
    }

    const seats = requestData.seat?.map(seat => ({
      seatNumber: seat.seatNumber,
      flight: seat.flight
    }))

    context = context.withSessionBuilder((sessionBuilder) => sessionBuilder
      .data(
        Builder<SessionData>(session.data)
          .seats(seats)
          .build()
      )
    )
    return Promise.resolve(true)
  }

}
