import { AxiosResponse } from 'axios'
import { mountUrlGetParams } from '../../../../utils/mount-url-query-params'
import { PriceModel } from '../@types/price'
import { SkuModel } from '../@types/sku'
import { BaseService, BaseServiceConfig } from '../base-service'
import { FindAllPayload } from '../interfaces/find-all.payload'
import { AddQuantitySkuDTO } from './dtos/add-quantity-sku.dto'
import { WithdrawQuantitySkuDTO } from './dtos/withdraw-quantity-sku.dto'

export interface SkusServiceConfig extends BaseServiceConfig {}

export class SkusServiceRest extends BaseService {
  constructor(data: SkusServiceConfig) {
    super(data)
  }

  async addQuantity(
    skuId: string,
    data: AddQuantitySkuDTO
  ): Promise<AxiosResponse<{ ok: boolean }>> {
    return await this.client.patch<{ ok: boolean }>(
      `/skus/${skuId}/quantity/add`,
      data
    )
  }

  async withdrawQuantity(
    skuId: string,
    data: WithdrawQuantitySkuDTO
  ): Promise<AxiosResponse<{ ok: boolean }>> {
    return await this.client.patch<{ ok: boolean }>(
      `/skus/${skuId}/quantity/withdraw`,
      data
    )
  }

  async findById(skuId: string): Promise<AxiosResponse<SkuModel>> {
    return await this.client.get<SkuModel>(`/skus/${skuId}`)
  }

  async findAll(data?: {
    page?: number
    limit?: number
    status?: string
  }): Promise<AxiosResponse<FindAllPayload<SkuModel>>> {
    const paramsData = mountUrlGetParams(data)
    return await this.client.get<FindAllPayload<SkuModel>>(
      `/skus${paramsData.exists ? '?' + paramsData.params : ''}`
    )
  }

  async findAllPrices(skuId: string): Promise<AxiosResponse<PriceModel[]>> {
    return this.client.get<PriceModel[]>(`/skus/${skuId}/prices`)
  }
}
