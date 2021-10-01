import { Flex } from '@chakra-ui/react';
import { Footer } from '../footer';
import { Header } from '../header';
import { Layout } from '../layout';

export interface RootLayoutProps {}

export const RootLayout: React.FC<RootLayoutProps> = ({
  children,
  ...props
}) => {
  return (
    <Layout>
      <Header />
      <Flex as="main" width="full" justifyContent="center" alignItems="center">
        {children}
      </Flex>
      <Footer />
    </Layout>
  );
};
