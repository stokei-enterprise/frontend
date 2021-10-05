import { Flex, Stack } from '@chakra-ui/react';
import { Card } from '~/components/ui/card';
import { Api } from '@stokei/core';
import { Material } from '../material';
import { NoMaterial } from '../no-material';

interface Props {
  readonly materials: Api.Rest.MaterialModel[];
}

export const ListMaterials: React.FC<Props> = ({ materials }) => {
  return (
    <Flex width="full">
      {materials?.length > 0 ? (
        <Card
          width="full"
          body={
            <Stack width="full" spacing="5">
              {materials?.map((material) => (
                <Material key={material.id} material={material} />
              ))}
            </Stack>
          }
        />
      ) : (
        <NoMaterial />
      )}
    </Flex>
  );
};
