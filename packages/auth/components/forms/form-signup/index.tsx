import {
  Flex,
  Heading,
  Icon,
  Link,
  Text,
  useDisclosure
} from '@chakra-ui/react';
import { useFormik } from 'formik';
import NextLink from 'next/link';
import { useContext, useState } from 'react';
import * as Yup from 'yup';
import { UserIcon } from '~/components/icons';
import { Button } from '~/components/ui/button';
import { Input, InputEmail, InputPassword } from '~/components/ui/input';
import { AppContext } from '~/contexts/app';
import { RootContext } from '~/contexts/root';
import { currentDevice } from '~/services/device';
import { clientRestApi } from '~/services/rest-api';
import { setToken } from '~/utils/auth';
import { colors } from '~/utils/constants';
import { AppBox } from '../app-box';
import { SocialAuthBox } from '../social-auth-box';

interface FormSignUpProps {}

export const FormSignUp: React.FC<FormSignUpProps> = ({ ...props }) => {
  const { isOpen, onOpen } = useDisclosure();
  const [error, setError] = useState('');

  const { app } = useContext(AppContext);
  const { redirectUri, loginUri } = useContext(RootContext);

  const formik = useFormik({
    initialValues: { firstname: '', lastname: '', email: '', password: '' },
    validationSchema: Yup.object({
      firstname: Yup.string().required('Obrigatório'),
      password: Yup.string()
        .min(6, 'A senha deve conter no mínimo 6 caracteres!')
        .required('Obrigatório'),
      email: Yup.string()
        .email('Endereço de email inválido!')
        .required('Obrigatório')
    }),
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      setError((data) => '');
      try {
        const device = currentDevice();
        const response = await clientRestApi()
          .auth()
          .signup({
            account: {
              firstname: values.firstname,
              lastname: values.lastname,
              email: values.email,
              password: values.password
            },
            device,
            redirectUri
          });

        const errors: string[] = response?.data?.errors;
        if (errors && errors.length) {
          const error = errors.reduce((prev, curr) => {
            const currError = (curr + '').toLowerCase();
            if (currError.match(/already exists/g)) {
              return { ...prev, email: 'Email já existe!' };
            }
            if (currError.match(/firstname/g)) {
              return { ...prev, firstname: 'Nome não informado!' };
            }
            if (currError.match(/lastname/g)) {
              return { ...prev, lastname: 'Sobrenome não informado!' };
            }
            if (currError.match(/email/g)) {
              return { ...prev, email: 'Email não informado!' };
            }
            if (currError.match(/password/g)) {
              return { ...prev, password: 'Passoword não informado!' };
            }
            return { ...prev };
          }, {});
          setErrors(error);

          setSubmitting(false);
          return;
        }

        if (response?.data?.accessToken) {
          setToken(response.data.accessToken);

          window.location.href = response.data.redirectUri;
        } else {
          setError((data) => 'Ooops, desculpe, não consegui cadastrar você!');
        }
      } catch (error) {
        console.log(error);

        setError((data) => 'Ooops, desculpe, não consegui cadastrar você!');
      }

      setSubmitting(false);
    }
  });

  return (
    <Flex gridArea="form" flex={1} height="auto" flexDir="column">
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
        Cadastre-se
      </Heading>

      <SocialAuthBox isOpen={isOpen} onOpenEmail={onOpen} />

      {isOpen && (
        <Flex
          height="auto"
          flexDir="column"
          justifyContent="stretch"
          marginTop={6}
        >
          <form
            onSubmit={formik.handleSubmit}
            style={{
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            <Input
              name="firstname"
              label="Nome"
              placeholder="Nome"
              rightElement={
                <Icon as={UserIcon} color="blackAlpha.700" size="18" />
              }
              borderColor={formik.errors.firstname && 'red.400'}
              errorMessage={formik.touched.firstname && formik.errors.firstname}
              {...formik.getFieldProps('firstname')}
            />

            <Input
              name="lastname"
              label="Sobrenome"
              placeholder="Sobrenome"
              rightElement={
                <Icon as={UserIcon} color="blackAlpha.700" size="18" />
              }
              borderColor={formik.errors.lastname && 'red.400'}
              errorMessage={formik.touched.lastname && formik.errors.lastname}
              {...formik.getFieldProps('lastname')}
            />

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

            <Flex>
              <Text color="gray.500" fontSize="xs">
                Ao se cadastrar, você concorda com os{' '}
                <NextLink href="/terms">
                  <Link color={colors.primary.main}>termos de uso</Link>
                </NextLink>
                .
              </Text>
            </Flex>

            {error && <Text color="red.500">{error}</Text>}

            <Button
              type="submit"
              isLoading={formik.isSubmitting}
              loadingText="Cadastrando"
              spinnerPlacement="end"
              disabled={formik.isSubmitting || !formik.isValid}
              marginTop={6}
            >
              Cadastrar
            </Button>
          </form>
        </Flex>
      )}

      <Text textAlign="center" fontSize="sm" marginTop={6}>
        Já possui uma conta?{' '}
        <NextLink href={loginUri}>
          <Link
            color={colors.primary.main}
            fontWeight="bold"
            _hover={{ color: colors.primary.light }}
          >
            Faça login
          </Link>
        </NextLink>
      </Text>
    </Flex>
  );
};
