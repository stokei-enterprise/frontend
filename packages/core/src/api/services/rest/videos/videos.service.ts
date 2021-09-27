import { AxiosResponse } from 'axios'
import { VideoModel } from '../@types/video'
import { BaseService, BaseServiceConfig } from '../base-service'

export interface VideosServiceConfig extends BaseServiceConfig {}

export class VideosServiceRest extends BaseService {
  constructor(data: VideosServiceConfig) {
    super(data)
  }

  async findById(id: string): Promise<AxiosResponse<VideoModel>> {
    return await this.client.get<VideoModel>(`/videos/${id}`)
  }
}
