import { Api } from '@stokei/core';
import { GetServerSideProps } from 'next';
import { Container } from '~/components/layouts/container';
import { Layout } from '~/components/layouts/root/layout';
import { Header } from '~/components/pages/subscriptions/header';
import { ListSubscriptions } from '~/components/pages/subscriptions/list-subscriptions';
import { clientRestApi } from '~/services/rest-api';
import { getAuth } from '~/utils/is-auth';

interface Props {
  readonly subscriptions: Api.Rest.SubscriptionModel[];
}

export default function Home({ subscriptions, ...props }: Props) {
  return (
    <Layout>
      <Container flexDir="column" paddingY={8}>
        <Header title="Assinaturas" />
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

  const meService = clientRestApi({ context }).me().subscriptions({});
  const status = context?.query?.status ? context?.query?.status + '' : '';
  const page = context?.query?.page ? context?.query?.page + '' : '0';
  let subscriptions = [];
  try {
    subscriptions = (
      await meService.findAll({
        status: `${status}:desc`,
        createdAt: `:desc`,
        page
      })
    )?.data?.items;
  } catch (error) {}
  return {
    props: {
      subscriptions
    }
  };
};
