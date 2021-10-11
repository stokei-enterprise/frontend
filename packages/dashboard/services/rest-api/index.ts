import { Api } from '@stokei/core';

export const clientRestApi = (
  config?: Api.Rest.ClientRestAPIConfig
): Api.Rest.ClientRestAPIInstance => {
  return Api.Rest.ClientRestAPI(config);
};
