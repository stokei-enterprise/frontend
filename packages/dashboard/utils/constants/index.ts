import { URLs } from '@stokei/core';

export const SITE_NAME = 'Stokei';

export const ASPECT_RATIO_COURSES = 16 / 12;

export const logoUrl = 'https://assets.stokei.com/logos/logo.png';
export const logoIconUrl = 'https://assets.stokei.com/logos/icon.png';
export const logoIconCleanUrl =
  'https://assets.stokei.com/logos/icon-clean.png';
export const logoWhiteUrl = 'https://assets.stokei.com/logos/logo-white.png';
export const faviconUrl = 'https://assets.stokei.com/logos/favicon.png';
export const assetsUrl = 'https://assets.stokei.com';
export const assetsIconsUrl = 'https://assets.stokei.com/icons';

export const landingPageUrl = 'https://stokei.com';

export const authUrl = URLs.FRONTEND_AUTH;
export const logoutUrl = URLs.FRONTEND_AUTH + '/logout';

export const desconnectedUrl = (appId?: string): string => {
  return `/desconnected`;
};
