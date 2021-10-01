import { useEffect } from 'react';
import { SkuModel } from '~/services/@types/sku';
import { ProductServiceRest } from '~/services/rest-api/services/product/product.service';
import { useRequest } from './use-request';

export interface UseSkuPricesResponse {
  readonly loading: boolean;
  readonly skus: SkuModel[];
}

interface Props {
  readonly appId?: string;
  readonly productId: string;
}

export const useProductSkus = ({
  appId,
  productId
}: Props): UseSkuPricesResponse => {
  const productService = new ProductServiceRest({ appId });

  const { data, loading, submit } = useRequest({
    submit: async () => (await productService.skus(productId))?.items || []
  });

  useEffect(() => {
    (async () => {
      try {
        if (productId) {
          await submit();
        }
      } catch (error) {}
    })();
  }, [productId]);

  return {
    skus: data,
    loading
  };
};
