import { AppModel } from '../@types/app'
import { FindAllPayload } from '../interfaces/find-all.payload'
import { BaseService, BaseServiceConfig } from '../base-service'
import { CreateAppDTO } from './dtos/create-app.dto'
import { AxiosResponse } from 'axios'
import { mountUrlGetParams } from '../../../../utils/mount-url-query-params'

export interface AppsServiceConfig extends BaseServiceConfig {}

export class AppsServiceRest extends BaseService {
  constructor(data: AppsServiceConfig) {
    super(data)
  }

  async create(data: CreateAppDTO): Promise<AxiosResponse<AppModel>> {
    return this.client.post<AppModel>(`/apps`, data)
  }

  async loadInfos(): Promise<AxiosResponse<AppModel>> {
    return this.client.get<AppModel>(`/apps/infos`)
  }

  async findAll(data?: {
    name?: string
    nickname?: string
    country?: string
    status?: string
    blockedAt?: string
    canceledAt?: string
    updatedAt?: string
    createdAt?: string
  }): Promise<AxiosResponse<FindAllPayload<AppModel>>> {
    const paramsData = mountUrlGetParams(data || {})
    return this.client.get<FindAllPayload<AppModel>>(
      `/apps${paramsData.exists ? '?' + paramsData.params : ''}`
    )
  }
}
