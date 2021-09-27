import { AxiosResponse } from 'axios'
import { CourseModel } from '../@types/course'
import { BaseService, BaseServiceConfig } from '../base-service'
import {
  CourseMaterialsServiceConfig,
  CourseMaterialsServiceRest
} from '../course-materials/course-materials.service'
import {
  CourseModulesServiceConfig,
  CourseModulesServiceRest
} from '../course-modules/course-modules.service'
import {
  CourseSkusServiceConfig,
  CourseSkusServiceRest
} from '../course-skus/course-skus.service'
import {
  CourseSubscriptionsServiceConfig,
  CourseSubscriptionsServiceRest
} from '../course-subscriptions/course-subscriptions.service'
import {
  CourseUsersServiceConfig,
  CourseUsersServiceRest
} from '../course-users/course-users.service'
import {
  CourseVideosServiceConfig,
  CourseVideosServiceRest
} from '../course-videos/course-video.service'
import { CreateCourseDTO } from './dtos/create-course.dto'
import { UpdateCourseDTO } from './dtos/update-course.dto'

export interface CoursesServiceConfig extends BaseServiceConfig {}

export class CoursesServiceRest extends BaseService {
  constructor(data: CoursesServiceConfig) {
    super(data)
  }

  materials(config: CourseMaterialsServiceConfig) {
    return new CourseMaterialsServiceRest(config)
  }
  modules(config: CourseModulesServiceConfig) {
    return new CourseModulesServiceRest(config)
  }
  videos(config: CourseVideosServiceConfig) {
    return new CourseVideosServiceRest(config)
  }
  skus(config: CourseSkusServiceConfig) {
    return new CourseSkusServiceRest(config)
  }
  users(config: CourseUsersServiceConfig) {
    return new CourseUsersServiceRest(config)
  }
  subscriptions(config: CourseSubscriptionsServiceConfig) {
    return new CourseSubscriptionsServiceRest(config)
  }

  async create(
    data: CreateCourseDTO | FormData
  ): Promise<AxiosResponse<CourseModel>> {
    return this.client.post<CourseModel>(`/courses`, data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  }

  async update(
    courseId: string,
    data: UpdateCourseDTO | FormData
  ): Promise<AxiosResponse<{ ok: boolean }>> {
    return this.client.patch<{ ok: boolean }>(`/courses/${courseId}`, data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  }

  async findById(id: string): Promise<AxiosResponse<CourseModel>> {
    return this.client.get<CourseModel>(`/courses/${id}`)
  }

  async findAll(): Promise<AxiosResponse<CourseModel[]>> {
    return this.client.get<CourseModel[]>(`/courses`)
  }
}
