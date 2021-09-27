import { AxiosResponse } from 'axios'
import { mountUrlGetParams } from '../../../../utils/mount-url-query-params'
import { VideoModel } from '../@types/video'
import { BaseService, BaseServiceConfig } from '../base-service'
import { FindAllPayload } from '../interfaces/find-all.payload'
import { CreateCourseVideoDTO } from './dtos/create-course-video.dto'
import { UpdateCourseVideoDTO } from './dtos/update-course-video.dto'

export interface CourseVideosServiceConfig extends BaseServiceConfig {
  readonly moduleId: string
}

export class CourseVideosServiceRest extends BaseService {
  readonly moduleId: string
  constructor(data: CourseVideosServiceConfig) {
    super(data)
    this.moduleId = data.moduleId
  }

  async create(
    data: CreateCourseVideoDTO | FormData
  ): Promise<AxiosResponse<VideoModel>> {
    return this.client.post<VideoModel>(
      `/modules/${this.moduleId}/videos`,
      data,
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
    )
  }

  async update(
    videoId: string,
    data: UpdateCourseVideoDTO | FormData
  ): Promise<AxiosResponse<VideoModel>> {
    return this.client.patch<VideoModel>(`/videos/${videoId}`, data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  }

  async delete(videoId: string): Promise<AxiosResponse<VideoModel>> {
    return this.client.delete<VideoModel>(`/videos/${videoId}`)
  }

  async findAll(data?: {
    page?: string
    limit?: string
    title?: string
    description?: string
    position?: string
    status?: string
    updatedAt?: string
    createdAt?: string
  }): Promise<AxiosResponse<FindAllPayload<VideoModel>>> {
    const requestData = mountUrlGetParams(data || {})
    return this.client.get<FindAllPayload<VideoModel>>(
      `/modules/${this.moduleId}/videos${
        requestData.exists ? '?' + requestData?.params : ''
      }`
    )
  }
}
