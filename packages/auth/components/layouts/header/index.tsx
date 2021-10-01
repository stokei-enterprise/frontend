import { Box, Flex, Image, Spacer, Stack } from '@chakra-ui/react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import { Button, ButtonOutlined } from '~/components/ui/button';
import { RootContext } from '~/contexts/root';
import { logoUrl } from '~/utils/constants';

interface HeaderProps {}

export const Header: React.FC<HeaderProps> = ({ ...props }) => {
  const { loginUri, signUpUri } = useContext(RootContext);
  const router = useRouter();

  return (
    <Flex
      as="header"
      width="100%"
      alignItems="center"
      paddingY={5}
      paddingX={10}
    >
      <Box margin={['auto', 'auto', '0px', '0px']}>
        <NextLink href="/">
          <Image
            height={10}
            src={logoUrl}
            fallbackSrc="/logo.png"
            cursor="pointer"
            alt="Logo"
          />
        </NextLink>
      </Box>
      {/* 
      <Spacer display={["none", "none", "flex", "flex"]} />

      <Stack
        display={["none", "none", "flex", "flex"]}
        direction="row"
        spacing="12"
        align="center"
      >
        <Link>Inicio</Link>
        <Link>Sobre</Link>
        <Link>Preços</Link>
      </Stack>
 */}
      <Spacer display={['none', 'none', 'flex', 'flex']} />

      <Stack
        display={['none', 'none', 'flex', 'flex']}
        direction="row"
        spacing={6}
        align="center"
      >
        <ButtonOutlined onClick={() => router.replace(loginUri)}>
          Entrar
        </ButtonOutlined>
        <Button onClick={() => router.replace(signUpUri)}>Cadastre-se</Button>
      </Stack>
    </Flex>
  );
};

export default Header;
