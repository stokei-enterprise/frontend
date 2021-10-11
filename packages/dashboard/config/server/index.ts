import { NODE_ENV } from '~/environments';
import { URLs } from '@stokei/core';

export const isProduction: boolean = NODE_ENV === 'production';
export const isDevelopment: boolean = NODE_ENV === 'development';

export const SERVER_URL = URLs.FRONTEND_DASHBOARD;
