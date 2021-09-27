import { UserModel } from '../@types/user'
import { FindAllData } from '../interfaces/find-all.data'
import { FindAllPayload } from '../interfaces/find-all.payload'
import { BaseService, BaseServiceConfig } from '../base-service'
import { mountUrlGetParams } from '../../../../utils/mount-url-query-params'
import { AxiosResponse } from 'axios'

export interface CourseUsersServiceConfig extends BaseServiceConfig {
  readonly courseId: string
}

export class CourseUsersServiceRest extends BaseService {
  readonly courseId: string
  constructor(data: CourseUsersServiceConfig) {
    super(data)
    this.courseId = data.courseId
  }

  async findAll(
    data?: FindAllData
  ): Promise<AxiosResponse<FindAllPayload<UserModel>>> {
    const requestParams = mountUrlGetParams({ ...data?.filter, ...data })
    return this.client.get<FindAllPayload<UserModel>>(
      `/courses/${this.courseId}/users${
        requestParams.exists ? '?' + requestParams.params : ''
      }`
    )
  }
}
