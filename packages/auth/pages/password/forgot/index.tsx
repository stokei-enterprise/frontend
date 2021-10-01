import { Box } from '@chakra-ui/react';
import { FormForgotPassword } from '~/components/forms/form-forgot-password';
import { RootLayout } from '~/components/layouts/root';

interface ForgotPasswordProps {}

export default function ForgotPassword({ ...props }: ForgotPasswordProps) {
  return (
    <RootLayout>
      <Box
        width="full"
        height="full"
        maxWidth={['full', 'full', '500px', '500px']}
        paddingY={8}
      >
        <Box
          width="100%"
          backgroundColor="gray.50"
          padding={8}
          borderRadius="sm"
          overflowY="auto"
        >
          <FormForgotPassword />
        </Box>
      </Box>
    </RootLayout>
  );
}
