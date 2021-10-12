import { SimpleGrid } from '@chakra-ui/react';
import { GetServerSideProps } from 'next';
import { Layout } from '~/components/layouts/apps/layout';
import { Container } from '~/components/layouts/container';
import { Card } from '~/components/ui/card';
import { ChartBar } from '~/components/ui/charts/bar';
import { ChartDoughnut } from '~/components/ui/charts/doughnut';
import { ChartLine } from '~/components/ui/charts/line';
import { ChartPie } from '~/components/ui/charts/pie';
import { clientRestApi } from '~/services/rest-api';
import { getAuth } from '~/utils/is-auth';

const data = [
  {
    label: 'Janeiro',
    value: 25
  },
  {
    label: 'Fevereiro',
    value: 32
  },
  {
    label: 'Março',
    value: 100
  },
  {
    label: 'Abril',
    value: 50
  },
  {
    label: 'Maio',
    value: 77
  },
  {
    label: 'Junho',
    value: 89
  },
  {
    label: 'Julho',
    value: 12
  },
  {
    label: 'Agosto',
    value: 66
  },
  {
    label: 'Setembro',
    value: 80
  },
  {
    label: 'Outubro',
    value: 79
  },
  {
    label: 'Novembro',
    value: 77
  },
  {
    label: 'Dezembro',
    value: 132
  }
];

export default function Home({ app, ...props }) {
  return (
    <Layout>
      <Container justifyContent="center" paddingY={8}>
        <SimpleGrid width="full" spacing={5} columns={[1, 1, 2, 2]}>
          <Card body={<ChartBar title="Pedidos" data={data} />} />
          <Card body={<ChartLine title="Pedidos" data={data} />} />
          <Card body={<ChartDoughnut title="Pedidos" data={data} />} />
          <Card body={<ChartPie title="Pedidos" data={data} />} />
        </SimpleGrid>
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
  try {
    if (auth.appId) {
      const app = await appService.loadInfos();
      if (app?.data) {
        return {
          props: {
            app: app?.data
          }
        };
      }
    }
  } catch (error) {}

  return {
    notFound: true
  };
};
