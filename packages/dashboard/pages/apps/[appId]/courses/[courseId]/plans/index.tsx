import { Flex } from '@chakra-ui/react';
import { GetServerSideProps } from 'next';
import React from 'react';
import { Container } from '~/components/layouts/container';
import { Layout } from '~/components/layouts/courses/layout';
import { Header } from '~/components/pages/apps/courses/plans/header';
import ListPlans from '~/components/pages/apps/courses/plans/list-plans';
import { clientRestApi } from '~/services/rest-api';
import {
  extractContextURLParam,
  extractContextURLQueryParam
} from '~/utils/extract-context-url-data';
import { userIsAllowedToSeeCourse } from '~/utils/is-allowed';
import { getAuth } from '~/utils/is-auth';

export default function Home({ plans, appId, courseId, ...props }) {
  return (
    <Layout>
      <Container flex="1" paddingY={10} flexDir="column">
        <Header appId={appId} courseId={courseId} title="Planos" />
        <Flex flexDir="column">
          <ListPlans appId={appId} courseId={courseId} plans={plans} />
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

  const courseSkuService = clientRestApi({ context })
    .courses()
    .skus({ courseId });
  const appId = auth.appId;
  const status = extractContextURLQueryParam('status', context);
  let plans = [];
  try {
    plans = (
      await courseSkuService.findAll({
        name: ':asc',
        status: `${status || ''}:asc`
      })
    )?.data?.items;
  } catch (error) {}

  return {
    props: {
      plans: plans || [],
      courseId,
      appId
    }
  };
};
