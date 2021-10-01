import { Box } from '@chakra-ui/react';
import { GetServerSideProps } from 'next';
import React from 'react';
import { FormChangePassword } from '~/components/forms/form-change-password';
import { RootLayout } from '~/components/layouts/root';

interface ChangePasswordProps {
  readonly code: string;
}

export default function ChangePassword({
  code,
  ...props
}: ChangePasswordProps) {
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
          <FormChangePassword code={code} />
        </Box>
      </Box>
    </RootLayout>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const code = context?.query?.code;

  if (!code) {
    return {
      notFound: true
    };
  }

  return {
    props: {
      code
    }
  };
};
