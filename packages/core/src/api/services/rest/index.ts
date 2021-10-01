import { AxiosRequestConfig } from 'axios'
import { AppsServiceRest } from './apps/apps.service'
import { AuthServiceRest } from './auth/auth.service'
import { BaseServiceConfig } from './base-service'
import { CategoriesServiceRest } from './categories/categories.service'
import { CoursesServiceRest } from './courses/courses.service'
import { MeServiceRest } from './me/me.service'
import { PasswordsServiceRest } from './passwords/passwords.service'
import { PricesServiceRest } from './prices/prices.service'
import { SkusServiceRest } from './skus/skus.service'
import { SubscriptionsServiceRest } from './subscriptions/subscriptions.service'
import { UsersServiceRest } from './users/users.service'
import { VideosServiceRest } from './videos/videos.service'

export * as Models from './@types'
export * as Interfaces from './interfaces'

export interface ClientRestAPIInstance {
  readonly auth: () => AuthServiceRest
  readonly apps: () => AppsServiceRest
  readonly categories: () => CategoriesServiceRest
  readonly courses: () => CoursesServiceRest
  readonly me: () => MeServiceRest
  readonly passwords: () => PasswordsServiceRest
  readonly prices: () => PricesServiceRest
  readonly skus: () => SkusServiceRest
  readonly subscriptions: () => SubscriptionsServiceRest
  readonly users: () => UsersServiceRest
  readonly videos: () => VideosServiceRest
}

export interface ClientRestAPIConfig extends BaseServiceConfig {}

export const ClientRestAPI = (
  config: ClientRestAPIConfig
): ClientRestAPIInstance => {
  const configData = config || {}
  return {
    auth: () => new AuthServiceRest(configData),
    apps: () => new AppsServiceRest(configData),
    categories: () => new CategoriesServiceRest(configData),
    courses: () => new CoursesServiceRest(configData),
    me: () => new MeServiceRest(configData),
    passwords: () => new PasswordsServiceRest(configData),
    prices: () => new PricesServiceRest(configData),
    skus: () => new SkusServiceRest(configData),
    subscriptions: () => new SubscriptionsServiceRest(configData),
    users: () => new UsersServiceRest(configData),
    videos: () => new VideosServiceRest(configData)
  }
}
