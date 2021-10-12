import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import React from 'react';
import { Container } from '~/components/layouts/container';
import { Layout } from '~/components/layouts/courses/layout';
import { Header } from '~/components/pages/apps/courses/subscriptions/header';
import { ListSubscriptions } from '~/components/pages/apps/courses/subscriptions/list-subscriptions';
import { clientRestApi } from '~/services/rest-api';
import {
  extractContextURLParam,
  extractContextURLQueryParam
} from '~/utils/extract-context-url-data';
import { userIsAllowedToSeeCourse } from '~/utils/is-allowed';
import { getAuth } from '~/utils/is-auth';

export default function Home({ subscriptions, ...props }) {
  const router = useRouter();

  return (
    <Layout>
      <Container flex="1" paddingY={10} flexDir="column">
        <Header onSuccess={() => router.reload()} title="Assinaturas" />
        <ListSubscriptions subscriptions={subscriptions} />
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

  const courseService = clientRestApi({
    context
  }).courses();

  const status = extractContextURLQueryParam('status', context);

  let subscriptions = [];
  try {
    subscriptions = (
      await courseService.subscriptions({ courseId }).findAll({
        status: `${status}:desc`,
        createdAt: ':desc'
      })
    )?.data?.items;
  } catch (error) {}

  return {
    props: {
      subscriptions: subscriptions || []
    }
  };
};
