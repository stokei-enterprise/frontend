import { AxiosResponse } from 'axios'
import { BaseService, BaseServiceConfig } from '../base-service'

export interface PasswordsServiceConfig extends BaseServiceConfig {}

export class PasswordsServiceRest extends BaseService {
  constructor(data: PasswordsServiceConfig) {
    super(data)
  }

  async change(data: {
    email: string
    password: string
    code: string
  }): Promise<AxiosResponse<{ ok: boolean }>> {
    return this.client.post<{ ok: boolean }>(`/passwords/change`, data)
  }

  async forgot(data: {
    email: string
  }): Promise<AxiosResponse<{ ok: boolean }>> {
    return this.client.post<{ ok: boolean }>(`/passwords/forgot`, data)
  }
}
