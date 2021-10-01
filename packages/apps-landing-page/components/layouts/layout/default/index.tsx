import { Flex } from '@chakra-ui/react';
import React from 'react';
import { Footer } from '../footer';
import { Header } from './header';

interface Props {}

export const Default: React.FC<Props> = ({ children }) => {
  return (
    <Flex
      width="full"
      height="full"
      flexDir="column"
      justifyContent="center"
      alignContent="center"
    >
      <Header />
      {children}
      <Footer />
    </Flex>
  );
};
