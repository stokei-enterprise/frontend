import { Link } from '@chakra-ui/react';
import NextLink from 'next/link';
import { useContext } from 'react';
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
        <AppImage height="30px" src={app?.logo} />
      </Link>
    </NextLink>
  );
};
