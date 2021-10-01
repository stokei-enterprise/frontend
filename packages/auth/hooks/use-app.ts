import { useEffect } from 'react';
import { AppModel } from '~/services/@types/app';
import { clientRestApi } from '~/services/rest-api';
import { useRequest } from './use-request';

export interface UseAppResponse {
  readonly loading: boolean;
  readonly app: AppModel;
}

export const useApp = ({ appId }): UseAppResponse => {
  const appService = clientRestApi({ appId }).apps();

  const { data, loading, submit } = useRequest({
    submit: () => appService.loadInfos()
  });

  useEffect(() => {
    (async () => {
      try {
        if (appId) {
          await submit();
        }
      } catch (error) {}
    })();
  }, [appId, submit]);

  return {
    app: data,
    loading
  };
};
