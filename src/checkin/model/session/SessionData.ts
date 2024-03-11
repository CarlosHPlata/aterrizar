import { CountryCode } from '../Schema'
import { FlightData, SeatInformation } from './FlightData'

export interface SessionData {
  country: CountryCode
  flights: FlightData[]
  passengers: number
  agreementSigned?: boolean
  seats?: SeatInformation[]
}
