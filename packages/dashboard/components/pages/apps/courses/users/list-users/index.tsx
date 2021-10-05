import { SimpleGrid } from '@chakra-ui/react';
import { Api } from '@stokei/core';
import { User } from '../user';

interface Props {
  readonly users: Api.Rest.UserModel[];
}

export const ListUsers: React.FC<Props> = ({ users }) => {
  return (
    <SimpleGrid width="full" spacing="10" columns={[1, 2, 2, 3]}>
      {users?.map((user) => (
        <User key={user.id} user={user} />
      ))}
    </SimpleGrid>
  );
};

export default ListUsers;
