import { AxiosResponse } from 'axios'
import { CategoryModel } from '../@types/category'
import { BaseService, BaseServiceConfig } from '../base-service'

export interface CategoriesServiceConfig extends BaseServiceConfig {}

export class CategoriesServiceRest extends BaseService {
  constructor(data: CategoriesServiceConfig) {
    super(data)
  }

  async findById(id: string): Promise<AxiosResponse<CategoryModel>> {
    return this.client.get<CategoryModel>(`/categories/${id}`)
  }

  async findAll(): Promise<AxiosResponse<CategoryModel[]>> {
    return this.client.get<CategoryModel[]>(`/categories`)
  }
}
