import { GetServerSideProps } from 'next';
import React from 'react';
import { Container } from '~/components/layouts/container';
import { Layout } from '~/components/pages/courses/layout';
import { Header } from '~/components/pages/courses/materials/header';
import { ListMaterials } from '~/components/pages/courses/materials/list-materials';
import { clientRestApi } from '~/services/rest-api';
import { getAuth } from '~/utils/is-auth';

export default function Home({ materials, courseId, ...props }) {
  return (
    <Layout>
      <Container flex="1" paddingY={8} flexDir="column">
        <Header title="Materiais" />
        <ListMaterials materials={materials} />
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

  const materialService = clientRestApi({ context })
    .courses()
    .materials({ courseId });
  const materials = await materialService.findAll();
  return {
    props: {
      materials: materials?.data || [],
      courseId
    }
  };
};
