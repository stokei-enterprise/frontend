import { Flex, Heading } from '@chakra-ui/react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { ButtonOutlined } from '~/components/ui/button';
import { RootLayout } from '~/components/layouts/root';
import { removeToken } from '~/utils/auth';

interface Props {}

export default function Logout({ ...props }: Props) {
  const router = useRouter();

  return (
    <RootLayout>
      <Flex
        minHeight="70vh"
        justifyContent="center"
        alignItems="center"
        flexDir="column"
        padding={10}
      >
        <Flex flexDir="column" alignItems="flex-start" marginBottom={3}>
          <Heading size="2xl" lineHeight="shorter">
            Já estou com saudades de você.
          </Heading>
        </Flex>

        <ButtonOutlined mt={6} onClick={() => router.replace('/')}>
          Fazer login
        </ButtonOutlined>
      </Flex>
    </RootLayout>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  removeToken(context);
  return {
    props: {}
  };
};
