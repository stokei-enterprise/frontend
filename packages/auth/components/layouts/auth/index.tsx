import { Flex } from '@chakra-ui/react';
import { ReactNode } from 'react';
import { Container } from '../container';
import { Footer } from '../footer';
import { Layout } from '../layout';
import Header from './header';

export interface AuthLayoutProps {
  readonly right: ReactNode;
  readonly left: ReactNode;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({
  children,
  right,
  left,
  ...props
}) => {
  return (
    <Layout>
      <Flex as="main" width="full" height="full" position="relative">
        {left && (
          <Flex
            as="main"
            width="full"
            maxW={['full', 'full', '500px', '500px']}
            height="full"
            flexDir="column"
            backgroundColor="white"
            borderRightWidth={['0', '0', 'thin', 'thin']}
            position="fixed"
          >
            <Flex
              width="full"
              flexDir="column"
              overflowY="auto"
              maxW={['full', 'full', '500px', '500px']}
            >
              <Header />
              <Container>{left}</Container>
              <Footer />
            </Flex>
          </Flex>
        )}
        {right && (
          <Flex
            as="main"
            flex={1}
            height="100vh"
            maxHeight="full"
            flexDir="column"
            alignItems="center"
            justifyContent="center"
            backgroundColor="gray.100"
            display={['none', 'none', 'flex', 'flex']}
            marginLeft={['0', '0', '500px', '500px']}
          >
            {right}
          </Flex>
        )}
      </Flex>
    </Layout>
  );
};
