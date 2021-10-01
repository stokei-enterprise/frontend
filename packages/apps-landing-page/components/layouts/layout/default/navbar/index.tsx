import { Flex, Link, Spacer, Stack } from '@chakra-ui/react';
import NextLink from 'next/link';
import { useContext } from 'react';
import { Container } from '~/components/layouts/container';
import { Button, ButtonClean } from '~/components/ui/button';
import { Image } from '~/components/ui/image';
import { AuthContext } from '~/contexts/auth';
import { MenuContext } from '~/contexts/menu';
import { authUrl, logoUrl } from '~/utils/constants';
import { UserBox } from '../../user-box';
import { AppBox } from './app-box';
import { OptionBox } from './option-box';

interface Props {}

export const Navbar: React.FC<Props> = ({ ...props }) => {
  const { authenticated } = useContext(AuthContext);
  const { existsMenu } = useContext(MenuContext);
  return (
    <Container as="nav" width="full">
      <Flex alignItems="center" paddingY={3}>
        {!existsMenu && (
          <NextLink href="/">
            <Link>
              <Image
                marginRight={5}
                src={logoUrl}
                height="25px"
                fallbackSrc="/logo.png"
                alt="logo"
              />
            </Link>
          </NextLink>
        )}
        <AppBox />
        <Spacer />
        {authenticated ? (
          <Stack direction="row" spacing={4} align="center">
            <OptionBox />
            <UserBox />
          </Stack>
        ) : (
          <Stack direction="row" spacing={4} align="center">
            <ButtonClean onClick={() => (window.location.href = authUrl)}>
              Entrar
            </ButtonClean>
            <Button onClick={() => (window.location.href = authUrl)}>
              Cadastre-se
            </Button>
          </Stack>
        )}
      </Flex>
    </Container>
  );
};
