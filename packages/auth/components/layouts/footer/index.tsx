import { Flex, Link, Text } from '@chakra-ui/react';
import { colors, landingPageUrl, SITE_NAME } from '~/utils/constants';

interface FooterProps {}

export const Footer: React.FC<FooterProps> = (props) => {
  return (
    <Flex
      as="footer"
      width="100%"
      justifyContent="center"
      alignItems="center"
      paddingY={5}
      paddingX={10}
    >
      <Text fontSize="xs">
        Copyright ©{' '}
        <Link href={landingPageUrl} color={colors.primary.main}>
          {SITE_NAME}
        </Link>{' '}
        - Todos os direitos reservados
      </Text>
    </Flex>
  );
};
