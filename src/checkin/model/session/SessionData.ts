import { CountryCode } from '../Schema'
import ExtraPassengerInformation from './ExtraPassengerInformation'
import { FlightData } from './FlightData'

export interface SessionData {
  country: CountryCode
  flights: FlightData[]
  passengers: number
  agreementSigned?: boolean
  extra_passenger_information?: ExtraPassengerInformation[]
}
