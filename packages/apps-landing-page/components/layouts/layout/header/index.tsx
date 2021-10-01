import { Stack } from '@chakra-ui/react';

interface Props {}

export const Header: React.FC<Props> = ({ children, ...props }) => {
  return (
    <Stack
      as="header"
      width="full"
      direction="column"
      alignItems="center"
      backgroundColor="white"
    >
      {children}
    </Stack>
  );
};
