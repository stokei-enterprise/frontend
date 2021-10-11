import { Flex, Image, Text } from '@chakra-ui/react';
import { Api } from '@stokei/core';

interface Props {
  readonly app: Api.Rest.AppModel;
}

export const AppBox: React.FC<Props> = ({ app, ...props }) => {
  return (
    <Flex flexDir="column" marginBottom={4}>
      <Flex alignItems="center" justifyContent="center" marginBottom={4}>
        <Image
          height="50px"
          src={app.logo}
          fallbackSrc="/default-logo-app.png"
          alt="LogoApp"
        />
      </Flex>
      <Flex alignItems="center" justifyContent="center">
        <Text>
          Você será redirecionado para <b>{app.name}</b>.
        </Text>
      </Flex>
    </Flex>
  );
};
