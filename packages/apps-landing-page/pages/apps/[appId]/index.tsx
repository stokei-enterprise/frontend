import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { Container } from '~/components/layouts/container';
import { Layout } from '~/components/layouts/root/layout';
import { ListProducts } from '~/components/pages/home/list-products';
import { AppModel } from '~/services/@types/app';
import { ProductModel } from '~/services/@types/product';
import { AppServiceRest } from '~/services/rest-api/services/app/app.service';
import { ProductServiceRest } from '~/services/rest-api/services/product/product.service';

interface Props {
  readonly app: AppModel;
  readonly products: ProductModel[];
}

export default function Home({ app, products, ...props }: Props) {
  return (
    <Layout>
      <Head>
        {app?.name && <title>{app?.name}</title>}
        {app?.logo && (
          <link rel="shortcut icon" href={app?.logo || '/no-image.png'} />
        )}
      </Head>
      <Container paddingY={20}>
        <ListProducts products={products} />
      </Container>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const appService = new AppServiceRest({ context });
  const app = await appService.loadInfos();
  if (!app) {
    return {
      notFound: true
    };
  }

  const productService = new ProductServiceRest({ context });

  let products = null;
  try {
    products = await productService.findAll();
  } catch (error) {}

  return {
    props: {
      app,
      products: products?.items || []
    }
  };
};
