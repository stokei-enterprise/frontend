import { Flex, Stack } from '@chakra-ui/react';
import { Api } from '@stokei/core';
import { GetServerSideProps } from 'next';
import React from 'react';
import { Container } from '~/components/layouts/container';
import { Layout } from '~/components/pages/courses/layout';
import ListModules from '~/components/pages/courses/modules/list-modules';
import { Description } from '~/components/pages/courses/videos/description';
import { Title } from '~/components/pages/courses/videos/title';
import { Card } from '~/components/ui/card';
import { VideoPlayer } from '~/components/ui/video-player';
import { clientRestApi } from '~/services/rest-api';
import { getAuth } from '~/utils/is-auth';

interface Props {
  readonly courseId: string;
  readonly video: Api.Rest.VideoModel;
  readonly modules: Api.Rest.ModuleModel[];
}
export default function Home({ video, courseId, modules, ...props }: Props) {
  return (
    <Layout>
      <Container paddingY={8}>
        <Stack
          width="full"
          spacing={5}
          direction={['column', 'column', 'row', 'row']}
        >
          <Flex flex={1} flexDir="column">
            <Card
              body={
                <>
                  <VideoPlayer url={video?.url} />
                  <Title title={video?.title} />
                  {video?.description && (
                    <Description description={video?.description} />
                  )}
                </>
              }
            />
          </Flex>
          <Flex
            width={['full', 'full', '350px', '350px']}
            paddingBottom="50"
            flexDir="column"
          >
            <ListModules modules={modules} currentVideoId={video?.id} openAll />
          </Flex>
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

  const courseId = context?.params?.courseId
    ? context?.params?.courseId + ''
    : '';
  const videoId = context?.params?.videoId ? context?.params?.videoId + '' : '';

  const clientApi = clientRestApi({ context });
  const videoService = clientApi.videos();
  const video = await videoService.findById(videoId);
  if (!video?.data) {
    return {
      notFound: true
    };
  }
  const moduleService = clientApi.courses().modules({ courseId });
  const modules = (await moduleService.findAll())?.data || [];
  return {
    props: {
      video,
      modules,
      courseId
    }
  };
};
