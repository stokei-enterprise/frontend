import { useEffect } from 'react';
import { Api } from '@stokei/core';
import { clientRestApi } from '~/services/rest-api';
import { useRequest } from './use-request';

export interface UseSkuPricesResponse {
  readonly loading: boolean;
  readonly prices: Api.Rest.PriceModel[];
}

interface Props {
  readonly appId?: string;
  readonly skuId: string;
}

export const useSkuPrices = ({ appId, skuId }: Props): UseSkuPricesResponse => {
  const skuService = clientRestApi({ appId }).skus();

  const { data, loading, submit } = useRequest({
    submit: async () => (await skuService.findAllPrices(skuId))?.data
  });

  useEffect(() => {
    (async () => {
      try {
        if (skuId) {
          await submit();
        }
      } catch (error) {}
    })();
  }, [skuId]);

  return {
    prices: data,
    loading
  };
};
