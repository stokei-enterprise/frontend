import { Flex, Heading, Link, Text, useDisclosure } from '@chakra-ui/react';
import { useFormik } from 'formik';
import NextLink from 'next/link';
import React, { useContext } from 'react';
import * as Yup from 'yup';
import { Button } from '~/components/ui/button';
import { InputEmail, InputPassword } from '~/components/ui/input';
import { AppContext } from '~/contexts/app';
import { RootContext } from '~/contexts/root';
import { currentDevice } from '~/services/device';
import { clientRestApi } from '~/services/rest-api';
import { setToken } from '~/utils/auth';
import { colors } from '~/utils/constants';
import { AppBox } from '../app-box';
import { SocialAuthBox } from '../social-auth-box';

interface FormLoginProps {}

export const FormLogin: React.FC<FormLoginProps> = ({ ...props }) => {
  const { isOpen, onOpen } = useDisclosure();
  const { app } = useContext(AppContext);
  const { redirectUri, forgotPasswordUri, signUpUri } = useContext(RootContext);

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
      try {
        const device = currentDevice();
        const response = await clientRestApi()
          .auth()
          .login({
            account: {
              email: values.email,
              password: values.password
            },
            device,
            redirectUri
          });

        if (response?.data?.accessToken) {
          setToken(response.data.accessToken);

          window.location.href = response.data.redirectUri;
          setSubmitting(false);
          return;
        }
      } catch (error) {}

      setErrors({
        email: 'E-mail ou senha inválidos!',
        password: 'E-mail ou senha inválidos!'
      });

      setSubmitting(false);
    }
  });

  return (
    <Flex flex={1} height="auto" flexDir="column">
      {app && (
        <Flex
          width="full"
          marginBottom={5}
          alignItems="center"
          justifyContent="center"
        >
          <AppBox app={app} />
        </Flex>
      )}

      <Heading
        size="lg"
        textAlign="center"
        lineHeight="shorter"
        marginBottom="6"
      >
        Entre
      </Heading>

      <SocialAuthBox isOpen={isOpen} onOpenEmail={onOpen} />

      {isOpen && (
        <Flex flexDir="column" justifyContent="stretch" marginTop={6}>
          <form
            onSubmit={formik.handleSubmit}
            style={{
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            <InputEmail
              name="email"
              label="E-mail"
              placeholder="E-mail"
              borderColor={formik.errors.email && 'red.400'}
              errorMessage={formik.touched.email && formik.errors.email}
              {...formik.getFieldProps('email')}
            />

            <InputPassword
              name="password"
              label="Senha"
              placeholder="Senha"
              borderColor={formik.errors.password && 'red.400'}
              errorMessage={formik.touched.password && formik.errors.password}
              {...formik.getFieldProps('password')}
            />

            <NextLink href={forgotPasswordUri}>
              <Link
                alignSelf="flex-start"
                marginTop={2}
                fontSize="sm"
                color={colors.primary.main}
                fontWeight="bold"
                _hover={{ color: colors.primary.light }}
              >
                Esqueci minha senha
              </Link>
            </NextLink>

            <Button
              type="submit"
              isLoading={formik.isSubmitting}
              loadingText="Entrando"
              spinnerPlacement="end"
              disabled={formik.isSubmitting || !formik.isValid}
              marginTop={6}
            >
              Entrar
            </Button>
          </form>
        </Flex>
      )}

      <Text textAlign="center" fontSize="sm" marginTop={6}>
        Não tem uma conta?{' '}
        <NextLink href={signUpUri}>
          <Link
            color={colors.primary.main}
            fontWeight="bold"
            _hover={{ color: colors.primary.light }}
          >
            Registre-se
          </Link>
        </NextLink>
      </Text>
    </Flex>
  );
};
