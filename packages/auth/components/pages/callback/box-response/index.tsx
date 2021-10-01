import { Flex, Text } from "@chakra-ui/react";

interface Props {
  readonly success: boolean;
}

export const BoxResponse: React.FC<Props> = ({ success }) => {
  return <Flex flexDir="column" alignItems="flex-start">
    {
      success && 
      <Text>Login efetuado com sucesso!</Text>
    }
    {
      !success && 
      <Text>Nos desculpe, deu algo de errado!</Text>
    }
  </Flex>;
};

export default BoxResponse;
