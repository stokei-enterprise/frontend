import { Stack } from '@chakra-ui/react';
import { GetServerSideProps } from 'next';
import { Container } from '~/components/layouts/container';
import { Body } from '~/components/pages/courses/about/body';
import { Footer } from '~/components/pages/courses/about/footer';
import { Header } from '~/components/pages/courses/about/header';
import { Layout } from '~/components/pages/courses/layout';
import { getAuth } from '~/utils/is-auth';

export default function Home({ ...props }) {
  return (
    <Layout>
      <Container paddingY={8}>
        <Stack direction="column" spacing={5}>
          <Header />
          <Body />
          <Footer />
        </Stack>
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
    props: {}
  };
};
