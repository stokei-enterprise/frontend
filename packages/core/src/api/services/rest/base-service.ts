import { AxiosRequestConfig } from 'axios'
import { RestClient } from './interfaces/rest-client'
import { axiosClient } from '../../clients/axios'

export interface BaseServiceConfig extends AxiosRequestConfig {
  readonly context?: any
  readonly appId?: string
  readonly accessToken?: string
  readonly onDownloadProgress?: (progress: number) => any
  readonly onUploadProgress?: (progress: number) => any
}

export class BaseService {
  readonly context?: any
  readonly appId?: string
  readonly accessToken?: string
  readonly client: RestClient

  constructor(data: BaseServiceConfig) {
    this.context = data.context
    this.appId = this.extractAppId(data.appId)
    this.accessToken = data.accessToken
    this.client = axiosClient({
      accessToken: this.accessToken,
      appId: this.appId,
      ...data
    })
  }

  private extractAppId(appId?: string): string | undefined {
    if (this.context?.params?.appId) {
      return this.context.params.appId + ''
    } else if (this.context?.query?.appId) {
      return this.context.query.appId + ''
    }
    return appId
  }
}
