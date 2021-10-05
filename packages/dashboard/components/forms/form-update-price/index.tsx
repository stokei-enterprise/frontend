import { Flex, Stack, Text } from '@chakra-ui/react';
import { Api } from '@stokei/core';
import { useFormik } from 'formik';
import React from 'react';
import * as Yup from 'yup';
import { Button } from '~/components/ui/button';
import { InputNumber } from '~/components/ui/input-number';
import { useAlerts } from '~/contexts/alerts';
import { clientRestApi } from '~/services/rest-api';
import { colors } from '~/styles/colors';
import { convertToMoney } from '~/utils/convert-to-money';

interface Props {
  readonly price: Api.Rest.PriceModel;
  readonly appId: string;
  readonly onSuccess: () => any;
}

export const FormUpdatePrice: React.FC<Props> = ({
  price,
  appId,
  onSuccess,
  ...props
}) => {
  const { addAlert } = useAlerts();

  const formik = useFormik({
    initialValues: {
      percentageOff: 0
    },
    validationSchema: Yup.object({
      percentageOff: Yup.number()
    }),
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const percentageOff =
          values.percentageOff > 100
            ? 10000
            : Math.round(values.percentageOff * 100);

        const isRemove = percentageOff === 0;

        const priceService = clientRestApi({ appId }).prices();
        let response: any;
        if (isRemove) {
          response = await priceService.deleteDiscount(price.id);
        } else {
          response = await priceService.addDiscount(price.id, {
            discount: {
              name: `%${(percentageOff / 100).toFixed(2)} OFF`,
              percentageOff
            }
          });
        }

        if (response?.data) {
          addAlert({
            status: 'success',
            text: 'Preço alterado com sucesso!'
          });
          setSubmitting(false);
          onSuccess();
          return;
        }
      } catch (error) {}

      addAlert({
        status: 'error',
        text: 'Erro ao alterar o preço!'
      });
      setSubmitting(false);
    }
  });

  return (
    <Flex gridArea="form" flex={1} height="auto" flexDir="column">
      <Flex height="auto" flexDir="column">
        <form
          onSubmit={formik.handleSubmit}
          style={{
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <Stack direction="row" alignItems="center">
            <Text fontSize="xl" fontWeight="bold" color={colors.primary.main}>
              {convertToMoney(price?.amount, price?.currency)}
            </Text>
            {price?.fromAmount && (
              <Text fontSize="sm" color="gray.800">
                <del>{convertToMoney(price?.fromAmount, price?.currency)}</del>
              </Text>
            )}
          </Stack>

          <InputNumber
            id="percentageOff"
            name="percentageOff"
            label="Desconto %"
            placeholder="Desconto"
            min={0}
            max={100}
            step={0.01}
            precision={2}
            defaultValue={
              price?.discount?.percentageOff
                ? price?.discount?.percentageOff / 100
                : 0
            }
            onChange={(value) =>
              formik.setFieldValue(
                'percentageOff',
                parseFloat(value) > 100 ? 100 : parseFloat(value)
              )
            }
            borderColor={formik.errors.percentageOff && 'red.400'}
            errorMessage={
              formik.touched.percentageOff && formik.errors.percentageOff
            }
          />

          <Flex>
            <Button
              type="submit"
              isLoading={formik.isSubmitting}
              loadingText="Salvando"
              spinnerPlacement="end"
              disabled={formik.isSubmitting || !formik.isValid}
              marginTop={4}
            >
              Salvar
            </Button>
          </Flex>
        </form>
      </Flex>
    </Flex>
  );
};
