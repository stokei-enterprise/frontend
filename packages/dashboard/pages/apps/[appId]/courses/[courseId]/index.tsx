import { Box } from '@chakra-ui/react';
import { GetServerSideProps } from 'next';
import { Container } from '~/components/layouts/container';
import { Layout } from '~/components/layouts/courses/layout';
import { extractContextURLParam } from '~/utils/extract-context-url-data';
import { userIsAllowedToSeeCourse } from '~/utils/is-allowed';
import { getAuth } from '~/utils/is-auth';

export default function Home({ courseId, appId, ...props }) {
  return (
    <Layout>
      <Container justifyContent="center" paddingY={10}>
        <Box
          width="100%"
          backgroundColor="white"
          borderRadius="md"
          padding={16}
        >
          ALGUNS GRAFICOS
        </Box>
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
  const userIsAllowed = userIsAllowedToSeeCourse({ context, courseId});
  if (!userIsAllowed) {
    return { notFound: true };
  }

  return {
    props: {
      appId: auth.appId,
      courseId
    }
  };
};
