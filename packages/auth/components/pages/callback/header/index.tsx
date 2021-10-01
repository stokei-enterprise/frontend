import { Flex, Heading } from "@chakra-ui/react";

interface Props {
  readonly title: string;
  readonly color: string;
}

export const Header: React.FC<Props> = ({ title, color }) => {
  return (
    <Flex flexDir="column" alignItems="flex-start" marginBottom={3}>
      <Heading size="2xl" lineHeight="shorter" color={color}>
        {title}
      </Heading>
    </Flex>
  );
};

export default Header;
