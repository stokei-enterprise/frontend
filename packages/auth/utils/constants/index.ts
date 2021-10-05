import { currentDevice } from '~/services/device';
import { URLs } from '@stokei/core';
import { mountUri } from '../uri/mount-uri';

export const SITE_NAME = 'Stokei';

export const logoUrl = 'https://assets.stokei.com/logos/logo.png';
export const landingPageUrl = 'https://stokei.com';
export const faviconUrl = 'https://assets.stokei.com/logos/favicon.png';

interface ParamsSocialMediaURI {
  readonly redirectUri?: string;
  readonly appId?: string;
}

const authURI = async (baseURL: string, data: ParamsSocialMediaURI) => {
  const device = currentDevice();
  return await mountUri(baseURL, [
    data.redirectUri && {
      key: 'redirectUri',
      value: data.redirectUri
    },
    data.appId && {
      key: 'appId',
      value: data.appId
    },
    device && {
      key: 'device',
      value: JSON.stringify(device)
    }
  ]);
};

export const googleAuthURI = (data: ParamsSocialMediaURI) =>
  authURI(URLs.API_AUTH + '/google', data);

export const facebookAuthURI = (data: ParamsSocialMediaURI) =>
  authURI(URLs.API_AUTH + '/facebook', data);

export const colors = {
  primary: {
    dark: 'green.700',
    main: 'green.600',
    light: 'green.500'
  }
};
