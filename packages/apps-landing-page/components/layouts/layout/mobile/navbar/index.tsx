import { Flex, Spacer, Stack } from '@chakra-ui/react';
import { useContext } from 'react';
import { Container } from '~/components/layouts/container';
import { Button, ButtonClean } from '~/components/ui/button';
import { Image } from '~/components/ui/image';
import { AuthContext } from '~/contexts/auth';
import { authUrl, logoIconCleanUrl } from '~/utils/constants';
import { AppBox } from './app-box';
import { UserBox } from '../../user-box';
import { OptionBox } from './option-box';

interface Props {}

export const Navbar: React.FC<Props> = ({ ...props }) => {
  const { authenticated } = useContext(AuthContext);

  return (
    <Container as="nav" width="full">
      <Flex alignItems="center" paddingY={3}>
        <AppBox />
        <Spacer />
        {!authenticated ? (
          <Stack direction="row" spacing={4} align="center">
            <OptionBox />
            <UserBox />
          </Stack>
        ) : (
          <Stack direction="row" spacing={2} align="center">
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
