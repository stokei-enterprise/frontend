import { Flex } from '@chakra-ui/react';
import { DefaultLayout } from './default';
import { MobileLayout } from './mobile';

export interface LayoutProps {}

export const Layout: React.FC<LayoutProps> = ({ children, ...props }) => {
  return (
    <Flex
      width="full"
      height="full"
      minHeight="full"
      flexDir="column"
      position="relative"
    >
      <Flex
        width="full"
        height="full"
        display={['none', 'none', 'flex', 'flex']}
      >
        <DefaultLayout>{children}</DefaultLayout>
      </Flex>
      <Flex
        width="full"
        height="full"
        display={['flex', 'flex', 'none', 'none']}
      >
        <MobileLayout>{children}</MobileLayout>
      </Flex>
    </Flex>
  );
};
