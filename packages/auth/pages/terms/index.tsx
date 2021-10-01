import { Box } from '@chakra-ui/react';
import { RootLayout } from '~/components/layouts/root';

export default function Terms({ ...props }) {
  return (
    <RootLayout>
      <Box
        width="100%"
        maxWidth={['100%', '100%', '500px', '500px']}
        padding={5}
      >
        <Box
          width="100%"
          backgroundColor="gray.50"
          borderRadius="md"
          padding={16}
        >
          Termos de uso
        </Box>
      </Box>
    </RootLayout>
  );
}
