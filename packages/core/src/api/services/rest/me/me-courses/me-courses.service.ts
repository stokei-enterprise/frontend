import { AxiosResponse } from 'axios'
import { mountUrlGetParams } from '../../../../../utils/mount-url-query-params'
import { SubscriptionModel } from '../../@types/subscription'
import { BaseService, BaseServiceConfig } from '../../base-service'
import { FindAllPayload } from '../../interfaces/find-all.payload'

export interface MeCoursesServiceConfig extends BaseServiceConfig {}

export class MeCoursesServiceRest extends BaseService {
  constructor(data: MeCoursesServiceConfig) {
    super(data)
  }

  async findAll(data?: {
    limit?: string
    page?: string
  }): Promise<AxiosResponse<FindAllPayload<SubscriptionModel>>> {
    const paramsData = mountUrlGetParams(data || {})
    return this.client.get<FindAllPayload<SubscriptionModel>>(
      `/me/courses${paramsData.exists ? '?' + paramsData.params : ''}`
    )
  }
}
