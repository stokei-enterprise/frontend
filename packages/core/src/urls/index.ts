import { isProduction } from '@/environments'

export const FRONTEND_DASHBOARD = isProduction
  ? 'https://painel.stokei.com'
  : 'http://localhost:3000'

export const FRONTEND_AUTH = isProduction
  ? 'https://auth.stokei.com'
  : 'http://localhost:3050'

export const API_AUTH = isProduction
  ? 'https://oauth.stokei.com'
  : 'http://localhost:4050'

export const API = isProduction
  ? 'https://api.stokei.com'
  : 'http://localhost:4000'
