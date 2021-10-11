import { Flex } from '@chakra-ui/react';
import { GetServerSideProps } from 'next';
import { Container } from '~/components/layouts/container';
import { Layout } from '~/components/layouts/root/layout';
import { AddAppBox } from '~/components/pages/home/add-app';
import { ListApps } from '~/components/pages/home/list-apps';
import { Api } from '@stokei/core';
import { clientRestApi } from '~/services/rest-api';
import { getAuth } from '~/utils/is-auth';

interface Props {
  readonly apps: Api.Rest.AppModel[];
}

export default function Home({ apps, ...props }: Props) {
  return (
    <Layout>
      <Container paddingTop={10} paddingBottom={16}>
        {apps?.length > 0 ? (
          <Flex flexDir="column">
            <ListApps apps={apps} />
          </Flex>
        ) : (
          <Flex width="full" justifyContent="center" alignItems="center">
            <AddAppBox />
          </Flex>
        )}
      </Container>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const auth = await getAuth({ context });
  if (auth.redirect) {
    return { redirect: auth.redirect };
  }

  const appService = clientRestApi({ context }).apps();
  const apps = await appService.findAll();
  return {
    props: {
      apps: apps?.data?.items || []
    }
  };
};
