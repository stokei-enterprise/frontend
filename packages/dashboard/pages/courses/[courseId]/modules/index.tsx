import { GetServerSideProps } from 'next';
import React from 'react';
import { Container } from '~/components/layouts/container';
import { Layout } from '~/components/pages/courses/layout';
import { Header } from '~/components/pages/courses/modules/header';
import { ListModules } from '~/components/pages/courses/modules/list-modules';
import { clientRestApi } from '~/services/rest-api';
import { getAuth } from '~/utils/is-auth';

export default function Home({ modules, courseId, ...props }) {
  return (
    <Layout>
      <Container flex="1" paddingY={8} flexDir="column">
        <Header title="Módulos" />
        <ListModules modules={modules} openAll />
      </Container>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const auth = await getAuth({ context });
  if (auth.redirect) {
    return { redirect: auth.redirect };
  }

  const courseId = context?.params?.courseId
    ? context?.params?.courseId + ''
    : '';

  const moduleService = clientRestApi({ context })
    .courses()
    .modules({ courseId });
  const modules = await moduleService.findAll();
  return {
    props: {
      modules: modules?.data || [],
      courseId
    }
  };
};
