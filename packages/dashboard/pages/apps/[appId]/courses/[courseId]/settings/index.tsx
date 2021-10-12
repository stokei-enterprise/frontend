import { Flex } from '@chakra-ui/react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import React from 'react';
import { FormUpdateCourse } from '~/components/forms/form-update-course';
import { Container } from '~/components/layouts/container';
import { Layout } from '~/components/layouts/courses/layout';
import { Header } from '~/components/pages/apps/courses/settings/header';
import { clientRestApi } from '~/services/rest-api';
import { extractContextURLParam } from '~/utils/extract-context-url-data';
import { userIsAllowedToSeeCourse } from '~/utils/is-allowed';
import { getAuth } from '~/utils/is-auth';

export default function Home({ modules, course, appId, ...props }) {
  const router = useRouter();
  return (
    <Layout>
      <Container flex="1" paddingY={10} flexDir="column">
        <Flex
          flexDir="column"
          padding={5}
          borderRadius="sm"
          backgroundColor="white"
        >
          <Header title="Configurações" />
          <FormUpdateCourse
            appId={appId}
            course={course}
            onSuccess={() => router.reload()}
          />
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

  const courseId = extractContextURLParam('courseId', context);
  const userIsAllowed = userIsAllowedToSeeCourse({ context, courseId });
  if (!userIsAllowed) {
    return { notFound: true };
  }

  const courseService = clientRestApi({ context }).courses();
  let course = null;
  try {
    course = (await courseService.findById(courseId))?.data;
  } catch (error) {}
  return {
    props: {
      course,
      appId: auth.appId
    }
  };
};
