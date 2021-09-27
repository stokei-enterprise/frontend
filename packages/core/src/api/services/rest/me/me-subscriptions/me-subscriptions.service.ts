import { AxiosResponse } from 'axios'
import { mountUrlGetParams } from '../../../../../utils/mount-url-query-params'
import { SubscriptionModel } from '../../@types/subscription'
import { BaseService, BaseServiceConfig } from '../../base-service'
import { FindAllPayload } from '../../interfaces/find-all.payload'

export interface MeSubscriptionsServiceConfig extends BaseServiceConfig {}

export class MeSubscriptionsServiceRest extends BaseService {
  constructor(data: MeSubscriptionsServiceConfig) {
    super(data)
  }

  async findAll(data?: {
    limit?: string
    page?: string
    status?: string
    type?: string
    createdAt?: string
  }): Promise<AxiosResponse<FindAllPayload<SubscriptionModel>>> {
    const paramsData = mountUrlGetParams(data || {})
    return this.client.get<FindAllPayload<SubscriptionModel>>(
      `/me/subscriptions${paramsData.exists ? '?' + paramsData.params : ''}`
    )
  }
}
