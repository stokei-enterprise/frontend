import { NODE_ENV } from '~/environments';

export const isProduction: boolean = NODE_ENV === 'production';
export const isDevelopment: boolean = NODE_ENV === 'development';

export const SERVER_URL = isProduction ? "https://painel.stokei.com" : "http://localhost:3000";