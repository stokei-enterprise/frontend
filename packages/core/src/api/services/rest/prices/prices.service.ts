import { AxiosResponse } from 'axios'
import { PriceModel } from '../@types/price'
import { BaseService, BaseServiceConfig } from '../base-service'
import { AddDiscountDTO } from './dtos/add-discount.dto'

export interface PricesServiceConfig extends BaseServiceConfig {}

export class PricesServiceRest extends BaseService {
  constructor(data: PricesServiceConfig) {
    super(data)
  }

  async addDiscount(
    priceId: string,
    data: AddDiscountDTO
  ): Promise<AxiosResponse<PriceModel>> {
    return this.client.post<PriceModel>(`/prices/${priceId}/discount`, data)
  }

  async deleteDiscount(
    priceId: string
  ): Promise<AxiosResponse<{ ok: boolean }>> {
    return this.client.delete<{ ok: boolean }>(`/prices/${priceId}/discount`)
  }

  async findAll(): Promise<AxiosResponse<PriceModel[]>> {
    return this.client.get<PriceModel[]>(`/prices`)
  }
}
