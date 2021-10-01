import { baseApiAuthURL } from '@/api/urls'
import { AxiosResponse } from 'axios'
import { BaseService, BaseServiceConfig } from '../base-service'

export interface IAuthPayload {
  readonly accessToken: string
  readonly redirectUri: string
  readonly errors?: any
}

export interface AuthServiceConfig extends BaseServiceConfig {}

export class AuthServiceRest extends BaseService {
  constructor(data: AuthServiceConfig) {
    super({
      baseURL: baseApiAuthURL,
      ...data
    })
  }

  async login(data: {
    account: {
      email: string
      password: string
    }
    device: any
    redirectUri: string
  }): Promise<AxiosResponse<IAuthPayload>> {
    return this.client.post<IAuthPayload>(`/default/login`, data)
  }

  async signup(data: {
    account: {
      firstname: string
      lastname: string
      email: string
      password: string
    }
    device: any
    redirectUri: string
  }): Promise<AxiosResponse<IAuthPayload>> {
    return this.client.post<IAuthPayload>(`/default/signup`, data)
  }
}
