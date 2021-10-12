import { Api } from '@stokei/core';
import { getAccessToken } from '~/utils/get-auth-tokens';

export const clientRestApi = (
  config?: Api.Rest.ClientRestAPIConfig
): Api.Rest.ClientRestAPIInstance => {
  return Api.Rest.ClientRestAPI({
    ...config,
    accessToken: getAccessToken(config?.context)
  });
};
