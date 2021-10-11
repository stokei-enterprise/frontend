import { Stack } from '@chakra-ui/react';
import { Api } from '@stokei/core';
import { NoPlans } from '../no-plans';
import { Plan } from '../plan';

interface Props {
  readonly appId: string;
  readonly courseId: string;
  readonly plans: Api.Rest.SkuModel[];
}

export const ListPlans: React.FC<Props> = ({ plans, courseId, appId }) => {
  return (
    <Stack width="full" direction="column" spacing={5}>
      {plans?.length > 0 ? (
        plans?.map((plan) => (
          <Plan key={plan.id} courseId={courseId} appId={appId} plan={plan} />
        ))
      ) : (
        <NoPlans />
      )}
    </Stack>
  );
};

export default ListPlans;
