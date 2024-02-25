import { RequestData } from '@http/Request'
import { IFlightRepository } from '../../interfaces/IFlightsRepository'
import { Builder } from 'builder-pattern'
import { Session } from '../../model/session'
import { SessionData } from '../../model/session/SessionData'
import { UserInformation } from '../../model/session/UserInformation'
import * as Crypto from 'crypto'
import { IMapRequestToSession } from '../../interfaces/ISessionRepository'

export const makeMapRequestToSession = (repository: IFlightRepository): IMapRequestToSession => async (requestData) => {
  const data = await mapSessionData(repository)(requestData)
  const userInformation = await mapUserInformation(requestData)

  return Builder<Session>()
    .sessionId(Crypto.randomUUID())
    .userId(requestData.userId)
    .data(data)
    .userInformation(userInformation)
    .build()
}

const mapSessionData = (repository: IFlightRepository) => async (requestData: RequestData): Promise<SessionData> => {
  const flights = await repository(requestData)

  return Builder<SessionData>()
    .country(requestData.country)
    .flights(flights)
    .passengers(requestData.passengers <= 0 ? 1 : requestData.passengers)
    .build()
}

const mapUserInformation = async (requestData: RequestData): Promise<UserInformation> => {
  return Builder<UserInformation>()
    .email(requestData.email)
    .passportNo((requestData.fields?.passport_number as string))
    .build()
}
