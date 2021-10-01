import { ProductModel } from '~/services/@types/product';
import { FindAllPayload } from '~/services/interfaces/find-all.payload';
import { BaseService, BaseServiceConfig } from '../base-service';

export interface ProductServiceConfig extends BaseServiceConfig {}

export class ProductServiceRest extends BaseService {
  constructor(data: ProductServiceConfig) {
    super(data);
  }

  async findAll(data?: {
    limit?: string;
    page?: string;
    name?: string;
    createdAt?: string;
  }): Promise<FindAllPayload<ProductModel>> {
    try {
      const dataParams = Object.entries(data || {});
      let params = '';
      if (dataParams.length > 0) {
        params = dataParams
          .map(([key, value]) => `${key}=${value || ''}`)
          .join('&');
      }
      const response = await this.client.get<FindAllPayload<ProductModel>>(
        `/products${params ? '?' + params : ''}`
      );
      if (response?.data) {
        return response.data;
      }
    } catch (error) {}
    return null;
  }

  async skus(
    productId: string,
    data?: {
      limit?: string;
      page?: string;
    }
  ): Promise<FindAllPayload<ProductModel>> {
    try {
      const dataParams = Object.entries(data || {});
      let params = '';
      if (dataParams.length > 0) {
        params = dataParams
          .map(([key, value]) => `${key}=${value || ''}`)
          .join('&');
      }
      const response = await this.client.get<FindAllPayload<ProductModel>>(
        `/products/${productId}/skus${params ? '?' + params : ''}`
      );
      if (response?.data) {
        return response.data;
      }
    } catch (error) {}
    return null;
  }
}
