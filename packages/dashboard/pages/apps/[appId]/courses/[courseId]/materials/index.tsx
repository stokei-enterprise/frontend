import { GetServerSideProps } from 'next';
import React from 'react';
import { Container } from '~/components/layouts/container';
import { Layout } from '~/components/layouts/courses/layout';
import Header from '~/components/pages/apps/courses/materials/header';
import ListMaterials from '~/components/pages/apps/courses/materials/list-materials';
import { clientRestApi } from '~/services/rest-api';
import { extractContextURLParam } from '~/utils/extract-context-url-data';
import { userIsAllowedToSeeCourse } from '~/utils/is-allowed';
import { getAuth } from '~/utils/is-auth';

export default function Home({ materials, courseId, appId, ...props }) {
  return (
    <Layout>
      <Container flex="1" paddingY={10} flexDir="column">
        <Header appId={appId} courseId={courseId} title="Materiais" />
        <ListMaterials
          appId={appId}
          courseId={courseId}
          materials={materials}
        />
      </Container>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const auth = await getAuth({ context });
  if (auth.redirect) {
    return { redirect: auth.redirect };
  }

  const courseId = extractContextURLParam('courseId', context);
  const userIsAllowed = userIsAllowedToSeeCourse({ context, courseId });
  if (!userIsAllowed) {
    return { notFound: true };
  }

  const courseMaterialService = clientRestApi({
    context
  })
    .courses()
    .materials({ courseId });
  const appId = auth.appId;
  let materials = [];
  try {
    materials = (await courseMaterialService.findAll())?.data;
  } catch (error) {}
  return {
    props: {
      materials: materials || [],
      courseId,
      appId
    }
  };
};
