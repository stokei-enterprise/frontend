import { GetServerSideProps } from 'next';
import { Layout } from '~/components/layouts/apps/layout';
import { Container } from '~/components/layouts/container';
import { Header } from '~/components/pages/apps/courses/home/header';
import { ListCourses } from '~/components/pages/apps/courses/home/list-courses';
import { clientRestApi } from '~/services/rest-api';
import { getAuth } from '~/utils/is-auth';

export default function Home({ courses, appId, ...props }) {
  return (
    <Layout>
      <Container paddingTop={10} paddingBottom={16}>
        <Header title="Cursos" />
        <ListCourses courses={courses} />
      </Container>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const auth = await getAuth({ context });
  if (auth.redirect) {
    return { redirect: auth.redirect };
  }

  const courseService = clientRestApi({ context }).courses();
  let courses = [];
  try {
    courses = (await courseService.findAll())?.data || [];
  } catch (error) {}
  return {
    props: {
      courses,
      appId: auth?.appId
    }
  };
};
