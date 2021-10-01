import { Flex } from '@chakra-ui/react';

export interface MobileLayoutProps {}

export const MobileLayout: React.FC<MobileLayoutProps> = ({
  children,
  ...props
}) => {
  return (
    <Flex width="full" height="full" minHeight="full" flexDir="column">
      {children}
    </Flex>
  );
};
