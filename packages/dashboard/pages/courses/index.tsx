import { GetServerSideProps } from 'next';
import { Container } from '~/components/layouts/container';
import { Layout } from '~/components/layouts/root/layout';
import { Header } from '~/components/pages/courses/home/header';
import { ListCourses } from '~/components/pages/courses/home/list-courses';
import { clientRestApi } from '~/services/rest-api';
import { getAuth } from '~/utils/is-auth';

export default function Home({ courses, ...props }) {
  return (
    <Layout>
      <Container flexDir="column" paddingY={8}>
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

  let courses = [];
  try {
    courses = (await clientRestApi({ context }).me().courses({}).findAll())
      ?.data?.items;
  } catch (error) {}
  return {
    props: {
      courses
    }
  };
};
