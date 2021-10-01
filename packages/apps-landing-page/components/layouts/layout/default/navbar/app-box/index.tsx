import { Link, Stack, Text } from '@chakra-ui/react';
import NextLink from 'next/link';
import { useContext, useMemo } from 'react';
import { AppImage } from '~/components/ui/app-avatar';
import { AppContext } from '~/contexts/app';

interface Props {}

export const AppBox: React.FC<Props> = ({ children, ...props }) => {
  const { app, baseUrl } = useContext(AppContext);
  if (!app) {
    return <></>;
  }
  return (
    <NextLink href={baseUrl}>
      <Link _hover={{ textDecoration: 'none' }}>
        <Stack align="center" spacing={2} direction="row">
          <AppImage height="60px" src={app?.logo} />
        </Stack>
      </Link>
    </NextLink>
  );
};
