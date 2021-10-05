import { GetServerSideProps } from 'next';
import Router from 'next/router';
import { FormUpdateAccountInfo } from '~/components/forms/form-update-account-info';
import { Layout } from '~/components/layouts/settings/layout';
import { Api } from '@stokei/core';
import { getAuth } from '~/utils/is-auth';

interface Props {
  readonly user: Api.Rest.MeModel;
}

export default function Home({ user, ...props }: Props) {
  return (
    <Layout user={user}>
      <FormUpdateAccountInfo user={user} onSuccess={() => Router.reload()} />
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const auth = await getAuth({ context });
  if (auth.redirect) {
    return { redirect: auth.redirect };
  }

  const user = auth.user;
  return {
    props: {
      user
    }
  };
};
