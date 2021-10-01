import {
  Button as ChakraButton,
  ButtonProps as ChakraButtonProps,
  Image
} from '@chakra-ui/react';
import React from 'react';
import { FaFacebook } from 'react-icons/fa';
import { EmailIcon } from '~/components/icons';
import { colors } from '~/utils/constants';

export const Button: React.FC<ChakraButtonProps> = (props) => {
  return (
    <ChakraButton
      color={props.color || 'white'}
      backgroundColor={props.backgroundColor || colors.primary.main}
      height="40px"
      minHeight="40px"
      borderRadius="full"
      paddingX="24px"
      _hover={{
        ...props._hover,
        backgroundColor: props._hover?.backgroundColor || colors.primary.light
      }}
      {...props}
    />
  );
};

export const ButtonClean: React.FC<ChakraButtonProps> = (props) => {
  return (
    <ChakraButton
      color={props.color || colors.primary.main}
      height="40px"
      minHeight="40px"
      borderRadius="full"
      paddingX="24px"
      variant="ghost"
      {...props}
    />
  );
};

export const ButtonOutlined: React.FC<ChakraButtonProps> = (props) => {
  return (
    <ChakraButton
      color={props.color || colors.primary.main}
      borderColor={props.borderColor || colors.primary.main}
      height="40px"
      minHeight="40px"
      borderRadius="full"
      paddingX="24px"
      variant="outline"
      {...props}
    />
  );
};

export const FacebookButton: React.FC<ChakraButtonProps> = (props) => {
  return (
    <ChakraButton
      backgroundColor="#e9effb"
      color="black.200"
      leftIcon={<FaFacebook color="#385898" size="18px" />}
      height="40px"
      minHeight="40px"
      borderRadius="full"
      paddingX="24px"
      _active={{
        ...props._active,
        backgroundColor: 'gray.300'
      }}
      _focus={{
        ...props._focus,
        backgroundColor: 'gray.300'
      }}
      _hover={{
        ...props._hover,
        backgroundColor: 'gray.300'
      }}
      {...props}
    />
  );
};

export const GoogleButton: React.FC<ChakraButtonProps> = (props) => {
  return (
    <ChakraButton
      backgroundColor="#e9effb"
      color="black.200"
      leftIcon={<Image src="/google_logo.png" alt="google" boxSize="15px" />}
      height="40px"
      minHeight="40px"
      borderRadius="full"
      paddingX="24px"
      _active={{
        ...props._active,
        backgroundColor: 'gray.300'
      }}
      _focus={{
        ...props._focus,
        backgroundColor: 'gray.300'
      }}
      _hover={{
        ...props._hover,
        backgroundColor: 'gray.300'
      }}
      {...props}
    />
  );
};

export const EmailButton: React.FC<ChakraButtonProps> = (props) => {
  return (
    <ChakraButton
      backgroundColor="#e9effb"
      color="black.200"
      leftIcon={<EmailIcon size="18px" />}
      height="40px"
      minHeight="40px"
      borderRadius="full"
      paddingX="24px"
      _active={{
        ...props._active,
        backgroundColor: 'gray.300'
      }}
      _focus={{
        ...props._focus,
        backgroundColor: 'gray.300'
      }}
      _hover={{
        ...props._hover,
        backgroundColor: 'gray.300'
      }}
      {...props}
    />
  );
};
