import { Flex } from '@chakra-ui/react';
import { GetServerSideProps } from 'next';
import router from 'next/router';
import { FormAddCourse } from '~/components/forms/form-add-course';
import { Layout } from '~/components/layouts/apps/layout';
import { Container } from '~/components/layouts/container';
import { Header } from '~/components/pages/apps/courses/add-course/header';
import { getAuth } from '~/utils/is-auth';

export default function Home({ appId, ...props }) {
  return (
    <Layout>
      <Container paddingTop={10} paddingBottom={16}>
        <Flex
          width="full"
          flexDirection="column"
          backgroundColor="white"
          borderRadius="sm"
          padding={5}
        >
          <Header title="Criando um novo curso" />
          <FormAddCourse appId={appId} onSuccess={() => router.reload()} />
        </Flex>
      </Container>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const auth = await getAuth({ context });
  if (auth.redirect) {
    return { redirect: auth.redirect };
  }
  
  return {
    props: {
      appId: auth.appId
    }
  };
};
