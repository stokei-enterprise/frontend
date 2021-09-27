import { AxiosResponse } from 'axios'
import { mountUrlGetParams } from '../../../../utils/mount-url-query-params'
import { BaseService, BaseServiceConfig } from '../base-service'
import { FindAllPayloadDTO } from './dtos/find-all-payload.dto'
import { FindAllDTO } from './dtos/find-all.dto'

export interface UsersServiceConfig extends BaseServiceConfig {}

export class UsersServiceRest extends BaseService {
  constructor(data: UsersServiceConfig) {
    super(data)
  }

  async findAll(data?: FindAllDTO): Promise<AxiosResponse<FindAllPayloadDTO>> {
    const dataParams = mountUrlGetParams<FindAllDTO | undefined>(data)
    return await this.client.get<FindAllPayloadDTO>(
      `/users${dataParams.exists ? '?' + dataParams.params : ''}`
    )
  }
}
