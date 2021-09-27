import { SubscriptionModel } from '../@types/subscription'
import { FindAllPayload } from '../interfaces/find-all.payload'
import { BaseService, BaseServiceConfig } from '../base-service'
import { AxiosResponse } from 'axios'
import { mountUrlGetParams } from '../../../../utils/mount-url-query-params'

export interface SubscriptionsServiceConfig extends BaseServiceConfig {}

export class SubscriptionsServiceRest extends BaseService {
  constructor(data: SubscriptionsServiceConfig) {
    super(data)
  }

  async cancel(id: string): Promise<AxiosResponse<{ ok: boolean }>> {
    return this.client.patch<{ ok: boolean }>(`/subscriptions/${id}/cancel`)
  }

  async start(id: string): Promise<AxiosResponse<{ ok: boolean }>> {
    return this.client.patch<{ ok: boolean }>(`/subscriptions/${id}/start`)
  }

  async findById(id: string): Promise<AxiosResponse<SubscriptionModel>> {
    return this.client.get<SubscriptionModel>(`/subscriptions/${id}`)
  }

  async findAll(data?: {
    status?: string
    createdAt?: string
    page?: string
    limit?: string
  }): Promise<AxiosResponse<FindAllPayload<SubscriptionModel>>> {
    const paramsData = mountUrlGetParams(data || {})
    return this.client.get<FindAllPayload<SubscriptionModel>>(
      `/subscriptions${paramsData.exists ? '?' + paramsData.params : ''}`
    )
  }
}
