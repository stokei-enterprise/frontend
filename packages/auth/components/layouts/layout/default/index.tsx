import { Flex } from '@chakra-ui/react';

export interface DefaultLayoutProps {}

export const DefaultLayout: React.FC<DefaultLayoutProps> = ({
  children,
  ...props
}) => {
  return (
    <Flex width="full" height="full" minHeight="full" flexDir="column">
      {children}
    </Flex>
  );
};
