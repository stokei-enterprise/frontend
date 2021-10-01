import { Flex, Heading, Link } from "@chakra-ui/react";
import { ReactElement } from "react";
import { colors } from "~/utils/constants";

interface Props {
  readonly title: string;
  readonly link: string;
  readonly icon: ReactElement;
}

export const Option: React.FC<Props> = ({ title, icon, link }) => {
  return (
    <Link href={link} _hover={{ textDecoration: "node" }}>
      <Flex
        flexDir="column"
        alignItems="center"
        justifyContent="center"
        borderWidth="2px"
        paddingY="10"
        paddingX="10"
        _hover={{
          borderColor: colors.primary.main,
          backgroundColor: "gray.100",
        }}
      >
        <Flex
          flex="1"
          padding={4}
          fontSize="2xl"
          color="white"
          backgroundColor={colors.primary.main}
          alignItems="center"
          borderRadius="full"
          mb={4}
        >
          {icon}
        </Flex>
        <Heading size="md" lineHeight="shorter">
          {title}
        </Heading>
      </Flex>
    </Link>
  );
};
