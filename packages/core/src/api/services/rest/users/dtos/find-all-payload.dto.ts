import { UserModel } from '../../@types/user'

export interface FindAllPayloadDTO {
  items: UserModel[]
  totalItems: number
  totalPages: number
  page: number
  firstPage: number
  lastPage: number
  nextPage: number
  prevPage: number
  hasNextPage: boolean
  hasPrevPage: boolean
}
