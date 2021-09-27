import { AxiosResponse } from 'axios'
import { mountUrlGetParams } from '../../../../utils/mount-url-query-params'
import { SubscriptionModel } from '../@types/subscription'
import { BaseService, BaseServiceConfig } from '../base-service'
import { FindAllPayload } from '../interfaces/find-all.payload'
import { CreateCourseSubscriptionDTO } from './dtos/create-course-subscription.dto'

export interface CourseSubscriptionsServiceConfig extends BaseServiceConfig {
  readonly courseId: string
}

export class CourseSubscriptionsServiceRest extends BaseService {
  readonly courseId: string
  constructor(data: CourseSubscriptionsServiceConfig) {
    super(data)
    this.courseId = data.courseId
  }

  async create(
    data: CreateCourseSubscriptionDTO
  ): Promise<AxiosResponse<SubscriptionModel>> {
    return this.client.post<SubscriptionModel>(
      `/courses/${this.courseId}/subscriptions`,
      data
    )
  }

  async start(data: {
    subscriptionId: string
    userId: string
  }): Promise<AxiosResponse<{ ok: boolean }>> {
    return this.client.patch<{ ok: boolean }>(
      `/courses/${this.courseId}/subscriptions/${data?.subscriptionId}/start`,
      data
    )
  }

  async cancel(data: {
    subscriptionId: string
    userId: string
  }): Promise<AxiosResponse<{ ok: boolean }>> {
    return this.client.patch<{ ok: boolean }>(
      `/courses/${this.courseId}/subscriptions/${data?.subscriptionId}/cancel`,
      data
    )
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
      `/courses/${this.courseId}/subscriptions${
        paramsData.exists ? '?' + paramsData.params : ''
      }`
    )
  }
}
