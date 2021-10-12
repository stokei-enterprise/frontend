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
import { extractContextURLParam } from '~/utils/extract-context-url-data';
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

  const clientApi = clientRestApi({ context });

  const courseId = extractContextURLParam(
    'courseId',
    context?.params?.courseId
  );
  const videoId = extractContextURLParam('videoId', context?.params?.videoId);

  const videoService = clientApi.videos();
  let video = null;
  try {
    video = (await videoService.findById(videoId))?.data;
  } catch (error) {}
  if (!video) {
    return {
      notFound: true
    };
  }

  const moduleService = clientApi.courses().modules({ courseId });
  let modules = [];
  try {
    modules = (await moduleService.findAll())?.data;
  } catch (error) {}
  return {
    props: {
      video,
      modules,
      courseId
    }
  };
};
