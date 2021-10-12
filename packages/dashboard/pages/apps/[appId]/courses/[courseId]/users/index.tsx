import { GetServerSideProps } from 'next';
import React from 'react';
import { Container } from '~/components/layouts/container';
import { Layout } from '~/components/layouts/courses/layout';
import { Header } from '~/components/pages/apps/courses/users/header';
import { ListUsers } from '~/components/pages/apps/courses/users/list-users';
import { NoUser } from '~/components/pages/apps/courses/users/no-users';
import { clientRestApi } from '~/services/rest-api';
import { extractContextURLParam } from '~/utils/extract-context-url-data';
import { userIsAllowedToSeeCourse } from '~/utils/is-allowed';
import { getAuth } from '~/utils/is-auth';

export default function Home({ users, ...props }) {
  return (
    <Layout>
      <Container paddingY={10} flexDir="column">
        <Header title="Alunos" />
        {users?.length > 0 ? <ListUsers users={users} /> : <NoUser />}
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

  const courseUserService = clientRestApi({ context })
    .courses()
    .users({ courseId });

  let users = [];
  try {
    users = (await courseUserService.findAll())?.data?.items || [];
  } catch (error) {}
  return {
    props: {
      users: users || []
    }
  };
};
