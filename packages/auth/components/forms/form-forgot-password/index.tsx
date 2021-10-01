import { Flex, Heading, Text } from '@chakra-ui/react';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import * as Yup from 'yup';
import { Button } from '~/components/ui/button';
import { InputEmail } from '~/components/ui/input';
import { clientRestApi } from '~/services/rest-api';

interface Props {}

export const FormForgotPassword: React.FC<Props> = (props) => {
  const [success, setSuccess] = useState('');
  const formik = useFormik({
    initialValues: { email: '' },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Endereço de email inválido!')
        .required('Obrigatório')
    }),
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      setSuccess('');
      try {
        const response = await clientRestApi().passwords().forgot({
          email: values.email
        });
        if (response?.data) {
          setSuccess('Foi enviado um email para você trocar sua senha!');
          setSubmitting(false);
          return;
        }
      } catch (error) {}

      setErrors({
        email: 'Erro ao solicitar o pedido de alteração de senha!'
      });

      setSubmitting(false);
    }
  });

  return (
    <Flex gridArea="form" flex={1} height="auto" flexDir="column">
      <Heading size="lg" lineHeight="shorter" marginBottom="3">
        Esqueceu sua senha?
      </Heading>
      <Text marginBottom="6">Diga-nos o seu email que iremos ajudar você.</Text>

      <Flex height="auto" flexDir="column" justifyContent="stretch">
        <form
          onSubmit={formik.handleSubmit}
          style={{
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <InputEmail
            id="email"
            name="email"
            label="E-mail"
            placeholder="E-mail"
            borderColor={formik.errors.email && 'red.400'}
            errorMessage={formik.touched.email && formik.errors.email}
            {...formik.getFieldProps('email')}
          />

          {success && <Text color={'green.500'}>{success}</Text>}

          <Button
            type="submit"
            isLoading={formik.isSubmitting}
            loadingText="Salvando"
            spinnerPlacement="end"
            disabled={formik.isSubmitting || !formik.isValid}
            marginTop={6}
          >
            Enviar
          </Button>
        </form>
      </Flex>
    </Flex>
  );
};
