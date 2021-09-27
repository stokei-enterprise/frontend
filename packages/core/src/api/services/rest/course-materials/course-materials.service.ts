import { AxiosResponse } from 'axios'
import { MaterialModel } from '../@types/material'
import { BaseService, BaseServiceConfig } from '../base-service'
import { CreateCourseMaterialDTO } from './dtos/create-course-material.dto'

export interface CourseMaterialsServiceConfig extends BaseServiceConfig {
  readonly courseId: string
}

export class CourseMaterialsServiceRest extends BaseService {
  readonly courseId: string
  constructor(data: CourseMaterialsServiceConfig) {
    super(data)
    this.courseId = data.courseId
  }

  async create(
    data: CreateCourseMaterialDTO | FormData
  ): Promise<AxiosResponse<MaterialModel>> {
    return this.client.post<MaterialModel>(
      `/courses/${this.courseId}/materials`,
      data,
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
    )
  }

  async delete(materialId: string): Promise<AxiosResponse<MaterialModel>> {
    return this.client.delete<MaterialModel>(
      `/courses/${this.courseId}/materials/${materialId}`
    )
  }

  async findAll(): Promise<AxiosResponse<MaterialModel[]>> {
    return this.client.get<MaterialModel[]>(
      `/courses/${this.courseId}/materials`
    )
  }
}
