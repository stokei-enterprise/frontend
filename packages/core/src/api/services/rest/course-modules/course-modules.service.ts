import { AxiosResponse } from 'axios'
import { ModuleModel } from '../@types/module'
import { BaseService, BaseServiceConfig } from '../base-service'
import { CreateCourseModuleDTO } from './dtos/create-course-module.dto'

export interface CourseModulesServiceConfig extends BaseServiceConfig {
  readonly courseId: string
}

export class CourseModulesServiceRest extends BaseService {
  readonly courseId: string
  constructor(data: CourseModulesServiceConfig) {
    super(data)
    this.courseId = data.courseId
  }

  async create(
    data: CreateCourseModuleDTO
  ): Promise<AxiosResponse<ModuleModel>> {
    return this.client.post<ModuleModel>(
      `/courses/${this.courseId}/modules`,
      data
    )
  }

  async delete(moduleId: string): Promise<AxiosResponse<ModuleModel>> {
    return this.client.delete<ModuleModel>(`/modules/${moduleId}`)
  }

  async findAll(): Promise<AxiosResponse<ModuleModel[]>> {
    return this.client.get<ModuleModel[]>(`/courses/${this.courseId}/modules`)
  }
}
