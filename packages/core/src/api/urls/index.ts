import { isProduction } from '@/environments'

export const baseApiURL = isProduction
  ? 'https://api.stokei.com'
  : 'http:localhost:4000'

export const baseApiAuthURL = isProduction
  ? 'https://oauth.stokei.com'
  : 'http:localhost:4050'
