import { Builder } from 'builder-pattern'
import { Context } from '../../../model/Context'
import { Session } from '../../../model/session'
import { FlightData } from '../../../model/session/FlightData'
import StepTemplate from '../StepTemplate'
import { UserInformation } from '../../../model/session/UserInformation'
import { RequestData } from '@http/Request'
import { VISA_REQUIRED_COUNTRIES, VISA_WAIVER_COUNTRIES } from '../../../model/VisaConstants'

export default class ValidateVisaStep extends StepTemplate {

  when(context: Context): boolean {
    const session: Session = context.getSession()
    const flights: FlightData[] = session.data.flights
    const isFlyingToVisaRequiredCountry: boolean = flights.some((flight) => VISA_REQUIRED_COUNTRIES.includes(flight.to.country))
    const isFromVisaWaiverCountry: boolean = VISA_WAIVER_COUNTRIES.includes(session.data.country)
    const isVisaRegistered: boolean = session.userInformation.visaNo !== undefined
    return isFlyingToVisaRequiredCountry && !isFromVisaWaiverCountry && !isVisaRegistered
  }

  onExecute(context: Context): Promise<boolean> {
    const session: Session = context.getSession()
    const requestData = context.getRequest()
    if (requestData.fields?.visa_number == null) {
      context = this.setVisaFieldAsRequired(context)
      return Promise.resolve(false)
    }
    context = this.saveVisaInSession(context, session, requestData)
    return Promise.resolve(true)
  }

  setVisaFieldAsRequired(context: Context): Context {
    context = context.withResponseBuilder((responseBuilder) => responseBuilder
      .status('user_information_required')
      .requiredFiles({ visa_number: null })
    )
    return context
  }

  saveVisaInSession(context: Context, session: Session, requestData: RequestData): Context {
    context = context.withSessionBuilder((sessionBuilder) => sessionBuilder
      .userInformation(
        Builder<UserInformation>(session.userInformation)
          .visaNo((requestData.fields?.visa_number as string))
          .build()
      )
    )
    return context
  }
}
