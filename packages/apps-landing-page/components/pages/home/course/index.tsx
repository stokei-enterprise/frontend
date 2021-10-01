import { Badge, Flex, Stack, Text } from '@chakra-ui/react';
import { useCallback } from 'react';
import {
  ChangeEvent,
  memo,
  useContext,
  useEffect,
  useMemo,
  useState
} from 'react';
import { ButtonOutlined } from '~/components/ui/button';
import { Card } from '~/components/ui/card';
import Select from '~/components/ui/select';
import { AppContext } from '~/contexts/app';
import { useProductSkus } from '~/hooks/use-product-skus';
import { useSkuPrices } from '~/hooks/use-sku-prices';
import { ProductModel } from '~/services/@types/product';
import { SkuModel } from '~/services/@types/sku';
import { colors } from '~/styles/colors';
import { checkoutUrl } from '~/utils/constants';
import { convertToMoney } from '~/utils/convert-to-money';

interface Props {
  readonly product: ProductModel;
}

const times = {
  day: {
    singular: 'dia',
    plural: 'dias'
  },
  week: {
    singular: 'semana',
    plural: 'semanas'
  },
  month: {
    singular: 'mês',
    plural: 'meses'
  },
  year: {
    singular: 'ano',
    plural: 'anos'
  }
};

export const Course: React.FC<Props> = memo(({ product }) => {
  const { baseUrl, app } = useContext(AppContext);
  const [currentSku, setCurrentSku] = useState(null);

  const { skus, loading } = useProductSkus({
    productId: product?.id,
    appId: app?.id
  });

  const setSku = useCallback(
    (position: number) => {
      if (position >= 0 && position < skus?.length) {
        setCurrentSku(skus[position]);
      } else {
        setCurrentSku(skus && skus[0]);
      }
    },
    [skus]
  );

  useEffect(() => {
    if (skus?.length > 0) {
      setSku(0);
    }
  }, [skus, setSku]);

  const url = useMemo(() => `${checkoutUrl}/buy/${product.id}`, [product]);

  const handleSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = parseInt(e.target.value);
    setSku(value);
  };

  return (
    <>
      <Card
        title={product?.course?.name}
        headerImage={product?.course?.imageUrl}
        borderWidth="thin"
        _hover={{
          boxShadow: 'md'
        }}
        body={
          <Flex width="full" flexDir="column" paddingY={2}>
            <Select onChange={handleSelect} marginBottom={3}>
              {!loading &&
                skus?.length > 0 &&
                skus.map((sku, index) => (
                  <option key={sku.id} value={index}>
                    {sku?.name}
                  </option>
                ))}
            </Select>

            {currentSku && <Sku sku={currentSku} />}
          </Flex>
        }
        footer={
          <Flex>
            <ButtonOutlined onClick={() => (window.location.href = url)}>
              Comprar agora
            </ButtonOutlined>
          </Flex>
        }
      />
    </>
  );
});
Course.displayName = 'Course';

interface SkuProps {
  readonly sku: SkuModel;
}

export const Sku: React.FC<SkuProps> = memo(({ sku }) => {
  const { app } = useContext(AppContext);
  const { prices, loading } = useSkuPrices({ skuId: sku?.id, appId: app?.id });

  const recurring = useMemo(() => {
    const time: {
      singular: string;
      plural: string;
    } = times[sku.recurring.type] || times.day;
    if (sku.type === 'permanent') {
      return 'VITALÍCIO';
    }
    const interval = sku.recurring.interval;
    return `${interval} ${interval === 1 ? time.singular : time.plural}`;
  }, [sku]);

  return (
    <Stack direction="column" spacing={2}>
      <Flex width="full">{recurring}</Flex>
      {!loading &&
        prices?.length > 0 &&
        prices.map((price) => (
          <Flex width="full" key={price.id} alignItems="flex-end">
            <Stack direction="row" alignItems="center">
              <Text
                fontSize="2xl"
                fontWeight="bold"
                lineHeight="shorter"
                color={colors.primary.main}
              >
                {convertToMoney(price?.amount, price?.currency)}
              </Text>
              {price?.fromAmount && (
                <Text fontSize="sm" color="gray.800">
                  <del>
                    {convertToMoney(price?.fromAmount, price?.currency)}
                  </del>
                </Text>
              )}
              {price.discount && (
                <Badge colorScheme="yellow">{price.discount.name}</Badge>
              )}
            </Stack>
          </Flex>
        ))}
    </Stack>
  );
});
