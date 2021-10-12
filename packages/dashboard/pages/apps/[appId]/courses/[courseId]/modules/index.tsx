import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import React from 'react';
import { Container } from '~/components/layouts/container';
import { Layout } from '~/components/layouts/courses/layout';
import { Header } from '~/components/pages/apps/courses/modules/header';
import { ListModules } from '~/components/pages/apps/courses/modules/list-modules';
import { NoModule } from '~/components/pages/apps/courses/modules/no-module';
import { clientRestApi } from '~/services/rest-api';
import { extractContextURLParam } from '~/utils/extract-context-url-data';
import { userIsAllowedToSeeCourse } from '~/utils/is-allowed';
import { getAuth } from '~/utils/is-auth';

export default function Home({ modules, courseId, appId, ...props }) {
  const router = useRouter();

  return (
    <Layout>
      <Container flex="1" paddingY={8} flexDir="column">
        <Header
          onSuccess={() => router.reload()}
          appId={appId}
          courseId={courseId}
          title="Módulos"
        />
        {modules && modules.length > 0 ? (
          <ListModules modules={modules} appId={appId} courseId={courseId} />
        ) : (
          <NoModule />
        )}
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

  const courseModuleService = clientRestApi({
    context
  })
    .courses()
    .modules({ courseId });
  const appId = auth.appId;

  let modules = [];
  try {
    modules = (await courseModuleService.findAll())?.data;
  } catch (error) {}
  return {
    props: {
      modules: modules || [],
      courseId,
      appId
    }
  };
};
