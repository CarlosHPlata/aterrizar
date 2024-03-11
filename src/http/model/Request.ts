import { UUID } from 'crypto'
import { CountryCode, RequiredField } from '../../checkin/model/Schema'
import { SeatInformation } from '../../checkin/model/session/FlightData'

export interface RequestData {
  country: CountryCode
  sessionId: UUID
  userId: string
  email: string
  flightNumbers: string[]
  passengers: number
  fields?: Partial<Record<RequiredField, unknown>>
  seat?: SeatInformation[]
}
