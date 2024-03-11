import { Context } from '../../../model/Context'
import { Session } from '../../../model/session'
import StepTemplate from '../StepTemplate'

export default class RequestSeatsStep extends StepTemplate {
  when(context: Context): boolean {
    const session = context.getSession()
    return session.data.seats?.length === 0 ?? false
  }

  onExecute(context: Context): Promise<boolean> {
    const session = context.getSession()
    if (this.areSeatsMissing(session)) {
      context = context.withResponseBuilder((responseBuilder) => responseBuilder
        .status('seats_assignation_required')
        .requiredFiles({ seats_required: null }))
      return Promise.resolve(false)
    }

    if (!this.areSeatsAssignedCorrectly(session)) {
      this.rejectRequest(context)
      return Promise.resolve(false)
    }
    return Promise.resolve(true)
  }

  private rejectRequest(context: Context): Context {
    return context.withResponseBuilder(
      (responseBulder) => responseBulder
        .status('rejected')
    )
  }

  private areSeatsMissing(session: Session): boolean {
    return !session.data.seats || session.data.seats.length === 0
  }

  private areSeatsAssignedCorrectly(session: Session): boolean {
    return session.data.seats?.length !== (session.data.passengers * session.data.flights.length)
  }

}
