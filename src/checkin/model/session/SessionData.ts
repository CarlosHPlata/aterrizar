import { CountryCode } from '../Schema'
import { FlightData } from './FlightData'

export interface SessionData {
  country: CountryCode
  flights: FlightData[]
  passengers: number
  agreementSigned?: boolean
}
