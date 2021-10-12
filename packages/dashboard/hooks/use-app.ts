import { useEffect } from 'react';
import { Api } from '@stokei/core';
import { clientRestApi } from '~/services/rest-api';
import { useRequest } from './use-request';

export interface UseAppResponse {
  readonly loading: boolean;
  readonly app: Api.Rest.AppModel;
}

export const useApp = ({ appId }): UseAppResponse => {
  const appService = clientRestApi({ appId }).apps();

  const { data, loading, submit } = useRequest({
    submit: async () => (await appService.loadInfos())?.data
  });

  useEffect(() => {
    (async () => {
      try {
        if (appId) {
          await submit();
        }
      } catch (error) {}
    })();
  }, [appId]);

  return {
    app: data,
    loading
  };
};
