import { Flex, Link, Text } from '@chakra-ui/react';
import { GetServerSideProps } from 'next';
import { useEffect } from 'react';
import { RootLayout } from '~/components/layouts/root';
import { BoxResponse } from '~/components/pages/callback/box-response';
import { Header } from '~/components/pages/callback/header';
import { URLs } from '@stokei/core';
import { setToken } from '~/utils/auth';
import { colors } from '~/utils/constants';

interface Props {
  readonly token?: string;
  readonly redirectUri?: string;
}

export default function Callback({ token, redirectUri, ...props }: Props) {
  const success = token ? true : false;

  useEffect(() => {
    if (token) {
      setToken(token);

      window.location.href = redirectUri;
    }
  }, [token, redirectUri]);

  return (
    <RootLayout>
      <Flex
        minHeight="70vh"
        justifyContent="center"
        alignItems="center"
        flexDir="column"
        paddingY={30}
      >
        <Header
          title={success ? 'Sucesso' : 'Ooops!'}
          color={success ? 'green.400' : 'red.500'}
        />

        <BoxResponse success={success} />

        {redirectUri && success && (
          <Text mt={6}>
            Aguarde ser redirecionado ou{' '}
            <Link
              fontWeight="bold"
              color={colors.primary.light}
              _hover={{ color: colors.primary.light }}
              href={redirectUri + ''}
            >
              clique aqui.
            </Link>
          </Text>
        )}

        {redirectUri && !success && (
          <Link
            mt={6}
            fontWeight="bold"
            color={'red.500'}
            _hover={{ color: 'red.500' }}
            href={redirectUri + ''}
          >
            Voltar
          </Link>
        )}
      </Flex>
    </RootLayout>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const token = context?.query?.token
    ? (context?.query?.token + '').trim()
    : null;
  const redirectUri = context?.query?.redirectUri
    ? (context?.query?.redirectUri + '').trim()
    : URLs.FRONTEND_DASHBOARD;

  if (token) {
    setToken(token, context);
  }

  return {
    props: {
      token,
      redirectUri
    }
  };
};
