import { Box, Heading, Image, Link, Text } from '@chakra-ui/react';
import NextLink from 'next/link';
import { useContext } from 'react';
import { FormLogin } from '~/components/forms/form-login';
import { AuthLayout } from '~/components/layouts/auth';
import { RootContext } from '~/contexts/root';
import { colors, logoUrl } from '~/utils/constants';

export default function Home({ ...props }) {
  const { homeUri } = useContext(RootContext);

  return (
    <AuthLayout
      left={
        <Box width="full" paddingY={12}>
          <FormLogin />
        </Box>
      }
      right={
        <Box width="full" paddingX={12}>
          <Box width="full" marginBottom={12}>
            <NextLink href={homeUri}>
              <Link>
                <Image
                  height={20}
                  src={logoUrl}
                  fallbackSrc="/logo.png"
                  cursor="pointer"
                  alt="Logo"
                />
              </Link>
            </NextLink>
          </Box>
          <Box width="full">
            <Heading color={colors.primary.main} marginBottom={2}>
              Seja bem vindo!
            </Heading>
            <Text>Aprenda, empreenda e se surpreenda.</Text>
          </Box>
        </Box>
      }
    />
  );
}
