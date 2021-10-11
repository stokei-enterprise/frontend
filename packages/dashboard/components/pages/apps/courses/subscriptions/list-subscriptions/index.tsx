import { Flex, SimpleGrid } from '@chakra-ui/react';
import { Api } from '@stokei/core';
import { NoSubscription } from '../no-subscription';
import { Subscription } from '../subscription';

interface Props {
  readonly subscriptions: Api.Rest.SubscriptionModel[];
}

export const ListSubscriptions: React.FC<Props> = ({ subscriptions }) => {
  return (
    <Flex width="full" flexDirection="column">
      {subscriptions?.length > 0 ? (
        <SimpleGrid width="full" spacing="10" columns={[1, 2, 2, 3]}>
          {subscriptions?.map((subscription) => (
            <Subscription key={subscription.id} subscription={subscription} />
          ))}
        </SimpleGrid>
      ) : (
        <NoSubscription />
      )}
    </Flex>
  );
};

export default ListSubscriptions;
