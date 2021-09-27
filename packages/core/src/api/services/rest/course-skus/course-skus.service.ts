import { AxiosResponse } from 'axios'
import { mountUrlGetParams } from '../../../../utils/mount-url-query-params'
import { SkuModel } from '../@types/sku'
import { BaseService, BaseServiceConfig } from '../base-service'
import { FindAllPayload } from '../interfaces/find-all.payload'
import { CreateCourseSkuDTO } from './dtos/create-course-sku.dto'

export interface CourseSkusServiceConfig extends BaseServiceConfig {
  readonly courseId: string
}

export class CourseSkusServiceRest extends BaseService {
  readonly courseId: string
  constructor(data: CourseSkusServiceConfig) {
    super(data)
    this.courseId = data.courseId
  }

  async create(data: CreateCourseSkuDTO): Promise<AxiosResponse<SkuModel>> {
    return this.client.post<SkuModel>(`/courses/${this.courseId}/skus`, data)
  }

  async delete(skuId: string): Promise<AxiosResponse<SkuModel>> {
    return this.client.patch<SkuModel>(`/skus/${skuId}/cancel`)
  }

  async start(skuId: string): Promise<AxiosResponse<SkuModel>> {
    return this.client.patch<SkuModel>(`/skus/${skuId}/start`)
  }

  async pause(skuId: string): Promise<AxiosResponse<SkuModel>> {
    return this.client.patch<SkuModel>(`/skus/${skuId}/pause`)
  }

  async findAll(data?: {
    name?: string
    status?: string
    limit?: number
    page?: number
  }): Promise<AxiosResponse<FindAllPayload<SkuModel>>> {
    const paramsData = mountUrlGetParams(data || {})
    return this.client.get<FindAllPayload<SkuModel>>(
      `/courses/${this.courseId}/skus${
        paramsData.exists ? '?' + paramsData.params : ''
      }`
    )
  }
}
