import { Flex, Heading, Text } from '@chakra-ui/react';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import * as Yup from 'yup';
import { Button } from '~/components/ui/button';
import { InputEmail, InputPassword } from '~/components/ui/input';
import { clientRestApi } from '~/services/rest-api';

interface Props {
  readonly code: string;
}

export const FormChangePassword: React.FC<Props> = ({ code, ...props }) => {
  const [success, setSuccess] = useState('');
  const formik = useFormik({
    initialValues: { email: '', password: '' },
    validationSchema: Yup.object({
      password: Yup.string()
        .min(6, 'A senha deve conter no mínimo 6 caracteres!')
        .required('Obrigatório'),
      email: Yup.string()
        .email('Endereço de email inválido!')
        .required('Obrigatório')
    }),
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      setSuccess('');
      try {
        const response = await clientRestApi().passwords().change({
          email: values.email,
          password: values.password,
          code
        });
        if (response) {
          setSuccess('Senha alterada com sucesso!');
          setSubmitting(false);
          return;
        }
      } catch (error) {}

      setErrors({
        email: 'Erro ao alterar sua senha!'
      });

      setSubmitting(false);
    }
  });

  return (
    <Flex gridArea="form" flex={1} height="auto" flexDir="column">
      <Heading size="lg" lineHeight="shorter" marginBottom="6">
        Alteração de senha
      </Heading>

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

          <InputPassword
            id="password"
            name="password"
            label="Nova senha"
            placeholder="Nova senha"
            borderColor={formik.errors.password && 'red.400'}
            errorMessage={formik.touched.password && formik.errors.password}
            {...formik.getFieldProps('password')}
          />

          {success && <Text color={'green.500'}>{success}</Text>}

          <Button
            type="submit"
            isLoading={formik.isSubmitting}
            loadingText="Enviando"
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
