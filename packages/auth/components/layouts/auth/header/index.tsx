import { Image, Link } from '@chakra-ui/react';
import NextLink from 'next/link';
import { useContext } from 'react';
import { RootContext } from '~/contexts/root';
import { logoUrl } from '~/utils/constants';
import { Container } from '../../container';

interface HeaderProps {}

export const Header: React.FC<HeaderProps> = ({ ...props }) => {
  const { homeUri } = useContext(RootContext);

  return (
    <Container as="header" paddingTop={5}>
      <NextLink href={homeUri}>
        <Link>
          <Image
            height={10}
            src={logoUrl}
            fallbackSrc="/logo.png"
            cursor="pointer"
            alt="Logo"
          />
        </Link>
      </NextLink>
    </Container>
  );
};

export default Header;
