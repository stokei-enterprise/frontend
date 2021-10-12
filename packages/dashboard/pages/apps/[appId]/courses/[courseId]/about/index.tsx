import { Flex, Heading, Stack } from '@chakra-ui/react';
import { GetServerSideProps } from 'next';
import React from 'react';
import { useContext } from 'react';
import { Container } from '~/components/layouts/container';
import { Layout } from '~/components/layouts/courses/layout';
import { Teacher } from '~/components/pages/courses/about/footer/teacher';
import { Card } from '~/components/ui/card';
import { Markdown } from '~/components/ui/markdown';
import { AuthContext } from '~/contexts/auth';
import { Api } from '@stokei/core';
import { clientRestApi } from '~/services/rest-api';
import { extractContextURLParam } from '~/utils/extract-context-url-data';
import { userIsAllowedToSeeCourse } from '~/utils/is-allowed';
import { getAuth } from '~/utils/is-auth';

interface Props {
  readonly course: Api.Rest.CourseModel;
}

export default function Home({ course, ...props }: Props) {
  const { user } = useContext(AuthContext);
  return (
    <Layout>
      <Container paddingY={10}>
        <Stack direction="column" spacing={5}>
          <Flex
            flexDirection="column"
            backgroundColor="white"
            padding={5}
            borderRadius="sm"
          >
            <Markdown content={course?.description || 'Sem descrição.'} />
          </Flex>

          <Card
            body={
              <>
                <Heading
                  fontWeight="normal"
                  size="md"
                  lineHeight="shorter"
                  marginBottom={3}
                >
                  Professores
                </Heading>
                <Stack direction="column" align="center" spacing={4}>
                  {course?.teachers.map((teacher) => (
                    <Teacher
                      key={teacher.id}
                      teacher={teacher}
                      itsMe={user?.id === teacher.id}
                    />
                  ))}
                </Stack>
              </>
            }
          />
        </Stack>
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

  let course = null;
  try {
    course = (await clientRestApi({ context }).courses().findById(courseId))
      ?.data;
  } catch (error) {}
  return {
    props: {
      course: course || null
    }
  };
};
