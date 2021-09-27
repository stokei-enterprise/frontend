import { AxiosResponse } from 'axios'
import { MeModel } from '../@types/me'
import { BaseService, BaseServiceConfig } from '../base-service'
import {
  MeCoursesServiceConfig,
  MeCoursesServiceRest
} from './me-courses/me-courses.service'
import {
  MeSubscriptionsServiceConfig,
  MeSubscriptionsServiceRest
} from './me-subscriptions/me-subscriptions.service'

export interface MeServiceConfig extends BaseServiceConfig {}

export class MeServiceRest extends BaseService {
  constructor(data: MeServiceConfig) {
    super(data)
  }

  async subscriptions(config: MeSubscriptionsServiceConfig) {
    return new MeSubscriptionsServiceRest(config)
  }

  async courses(config: MeCoursesServiceConfig) {
    return new MeCoursesServiceRest(config)
  }

  async load(): Promise<AxiosResponse<MeModel>> {
    return this.client.get<MeModel>(`/me`)
  }

  async updateAvatar(data?: { image: any }): Promise<AxiosResponse<any>> {
    const formData = new FormData()
    formData.append('image', data?.image)
    return this.client.patch(`/me/avatars`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  }

  async update(data?: {
    firstname?: string
    lastname?: string
    cpf?: string
    country?: string
    phone?: string
    dateBirthday?: string
  }): Promise<AxiosResponse<any>> {
    return this.client.patch(`/me`, {
      firstname: data?.firstname,
      lastname: data?.lastname,
      cpf: data?.cpf,
      country: data?.country,
      phone: data?.phone,
      dateBirthday: data?.dateBirthday
    })
  }
}
