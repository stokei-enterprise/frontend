import { memo } from 'react';
import { Card } from '~/components/ui/card';
import { UserAvatar } from '~/components/ui/user-avatar';
import { Api } from '@stokei/core';

interface Props {
  readonly user: Api.Rest.UserModel;
}

export const User: React.FC<Props> = memo(({ user }) => {
  return (
    <Card
      position="relative"
      title={user?.fullname}
      subtitle={user?.username ? '@' + user?.username : undefined}
      avatar={<UserAvatar src={user?.avatar} name={user?.fullname} size="md" />}
    />
  );
});
User.displayName = 'User';
