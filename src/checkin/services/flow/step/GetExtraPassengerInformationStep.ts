import { RequestData } from '@http/Request'
import { Context } from '../../../model/Context'
import { Session } from '../../../model/session'
import ExtraPassengerInformation from '../../../model/session/ExtraPassengerInformation'
import StepTemplate from '../StepTemplate'

export default class GetExtraPassengerInformationStep extends StepTemplate {

  when(context: Context): boolean {
    const extraPassengerInformationInSession = context.getSession().data.extra_passenger_information
    const numberOfPassengers = context.getSession().data.passengers

    return numberOfPassengers > 1 && extraPassengerInformationInSession === undefined
  }

  onExecute(context: Context): Promise<boolean> {
    const session = context.getSession()

    const extraPassengerInformation = this.getExtraPassengerInformationFromRequest(context.getRequest())

    if (this.validateExtraPassengerInformation(extraPassengerInformation, session)) {
      context = this.setExtraPassengersInformationInContextRequiredFiles(context)
      return Promise.resolve(false)
    }

    context = this.setExtraPassengerInformationInContextSession(context, extraPassengerInformation)

    return Promise.resolve(true)
  }

  private getExtraPassengerInformationFromRequest(requestData: RequestData): ExtraPassengerInformation[] {
    return requestData.fields?.extra_passenger_information as ExtraPassengerInformation[]
  }

  private validateExtraPassengerInformation(extraPassengerInformation: ExtraPassengerInformation[], session: Session): boolean {
    const amountOfExtraPassengers = this.getAmountOfExtraPassengersInSession(session)

    return !extraPassengerInformation || amountOfExtraPassengers > extraPassengerInformation.length
  }

  private getAmountOfExtraPassengersInSession(session: Session): number {
    return session.data.passengers - 1
  }

  private setExtraPassengersInformationInContextRequiredFiles(context: Context): Context {
    return context.withResponseBuilder((responseBuilder) => responseBuilder.status('user_information_required').requiredFiles({ extra_passenger_information: null }))
  }

  private setExtraPassengerInformationInContextSession(context: Context, extraPassengerInformation: ExtraPassengerInformation[]): Context {
    const { country, flights, passengers, agreementSigned } = context.getSession().data

    context = context.withSessionBuilder(sessionBuilder => sessionBuilder.data({
      country,
      flights,
      passengers,
      agreementSigned,
      extra_passenger_information: extraPassengerInformation
    }))

    return context
  }

}
