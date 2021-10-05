import { Flex } from '@chakra-ui/react';
import { Api } from '@stokei/core';
import { useFormik } from 'formik';
import React from 'react';
import * as Yup from 'yup';
import { Button } from '~/components/ui/button';
import { InputNumber } from '~/components/ui/input-number';
import { useAlerts } from '~/contexts/alerts';
import { clientRestApi } from '~/services/rest-api';

interface Props {
  readonly sku: Api.Rest.SkuModel;
  readonly appId: string;
  readonly onSuccess: () => any;
}

export const FormUpdateSkuQuantity: React.FC<Props> = ({
  sku,
  appId,
  onSuccess,
  ...props
}) => {
  const { addAlert } = useAlerts();

  const formik = useFormik({
    initialValues: {
      quantity: sku?.inventory?.quantity || 0
    },
    validationSchema: Yup.object({
      quantity: Yup.number()
    }),
    onSubmit: async (values, { setSubmitting }) => {
      try {
        let quantity = sku?.inventory.quantity - values.quantity;
        const skuService = clientRestApi({ appId }).skus();
        let response = null;
        if (quantity < 0) {
          quantity = quantity * -1;
          response = await skuService.addQuantity(sku?.id, { quantity });
        } else {
          response = await skuService.withdrawQuantity(sku?.id, { quantity });
        }
        if (response?.data) {
          addAlert({
            status: 'success',
            text: 'Quantidade atualizada com sucesso!'
          });
          setSubmitting(false);
          onSuccess();
          return;
        }
      } catch (error) {}

      addAlert({
        status: 'error',
        text: 'Erro ao atualizar a quantidade!'
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
          <InputNumber
            id="quantity"
            name="quantity"
            label="Quantidade"
            placeholder="Quantidade"
            borderColor={formik.errors.quantity && 'red.400'}
            errorMessage={formik.touched.quantity && formik.errors.quantity}
            min={1}
            step={1}
            defaultValue={sku?.inventory?.quantity || 0}
            value={formik.values.quantity}
            onChange={(value) =>
              formik.setFieldValue('quantity', parseInt(value))
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
