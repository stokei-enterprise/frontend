import { SimpleGrid } from '@chakra-ui/react';
import { ProductModel } from '~/services/@types/product';
import { Course } from '../course';

interface Props {
  readonly products: ProductModel[];
}

export const ListProducts: React.FC<Props> = ({ products }) => {
  return (
    <SimpleGrid width="full" spacing="10" columns={[1, 1, 2, 3]}>
      {products?.length > 0 &&
        products?.map((product) => (
          <Course key={product.id} product={product} />
        ))}
    </SimpleGrid>
  );
};
