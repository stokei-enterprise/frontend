import { Api } from '@stokei/core';
import { clientRestApi } from '~/services/rest-api';
import { useRequest } from './use-request';

export interface UseAppResponse {
  readonly loading: boolean;
  readonly error: any;
  readonly data: { ok: boolean };
  readonly submit: () => void;
}

interface Props {
  readonly appId?: string;
  readonly subscriptionId: string;
}

export const useStartSubscription = ({
  subscriptionId,
  appId
}: Props): UseAppResponse => {
  const subscriptionService = clientRestApi({ appId }).subscriptions();
  const { data, error, loading, submit } = useRequest({
    submit: async () => (await subscriptionService.start(subscriptionId))?.data
  });

  return {
    data,
    error,
    loading,
    submit
  };
};
