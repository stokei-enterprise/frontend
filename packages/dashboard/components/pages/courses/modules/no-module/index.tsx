import { Flex } from "@chakra-ui/react";
import React from "react";

interface Props {}

export const NoModule: React.FC<Props> = ({ ...props }) => {
  return (
    <Flex justifyContent="center" flexDir="column">
      Nenhum módulo encontrado.
    </Flex>
  );
};
