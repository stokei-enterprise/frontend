import { useEffect } from 'react';
import { Api } from '@stokei/core';
import { clientRestApi } from '~/services/rest-api';
import { useRequest } from './use-request';

export interface UseAuthResponse {
  readonly user: Api.Rest.UserModel;
  readonly loading: boolean;
}

export const useAuth = (): UseAuthResponse => {
  const meService = clientRestApi().me();

  const { data, loading, submit } = useRequest({
    submit: async () => (await meService.load())?.data
  });

  useEffect(() => {
    (async () => {
      try {
        await submit();
      } catch (error) {}
    })();
  }, []);

  return {
    user: data,
    loading
  };
};
