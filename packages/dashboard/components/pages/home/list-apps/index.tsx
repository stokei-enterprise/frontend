import { SimpleGrid } from '@chakra-ui/react';
import { Api } from '@stokei/core';
import { Card } from '~/components/ui/card';
import { AddAppCard } from '../add-app';
import App from '../app';

interface Props {
  readonly apps: Api.Rest.AppModel[];
}

export const ListApps: React.FC<Props> = ({ apps }) => {
  return (
    <SimpleGrid width="full" spacing="10" columns={[1, 1, 2, 3]}>
      <Card alignItems="center" justifyContent="center" body={<AddAppCard />} />
      {apps?.map((app) => (
        <App key={app.id} app={app} />
      ))}
    </SimpleGrid>
  );
};

export default ListApps;
