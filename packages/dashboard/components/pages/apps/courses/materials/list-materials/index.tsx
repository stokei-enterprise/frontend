import { SimpleGrid } from '@chakra-ui/react';
import { Api } from '@stokei/core';
import { Material } from '../material';
import { NoMaterial } from '../no-materials';

interface Props {
  readonly materials: Api.Rest.MaterialModel[];
  readonly courseId: string;
  readonly appId: string;
}

export const ListMaterials: React.FC<Props> = ({
  materials,
  appId,
  courseId
}) => {
  return (
    <SimpleGrid width="full" spacing="10" columns={[1, 1, 2, 3]}>
      {materials?.map((material) => (
        <Material
          key={material.id}
          appId={appId}
          courseId={courseId}
          material={material}
        />
      ))}
      {(!materials || !materials.length) && <NoMaterial />}
    </SimpleGrid>
  );
};

export default ListMaterials;
