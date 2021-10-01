import {
  FormControl,
  FormHelperText,
  FormLabel,
  Icon,
  Input as ChakraInput,
  InputGroup,
  InputLeftElement,
  InputProps as ChakraInputProps,
  InputRightElement
} from '@chakra-ui/react';
import React, { ReactNode, useState } from 'react';
import {
  EmailIcon,
  PasswordHideIcon,
  PasswordShowIcon
} from '~/components/icons';

interface Props extends ChakraInputProps {
  readonly label?: string;
  readonly leftElement?: ReactNode;
  readonly rightElement?: ReactNode;
  readonly helperMessage?: string;
  readonly errorMessage?: string;
}

export const Input: React.FC<Props> = ({
  label,
  leftElement,
  rightElement,
  helperMessage,
  errorMessage,
  ...props
}) => {
  return (
    <FormControl id={props.id} marginBottom={2}>
      {label && <FormLabel>{label}</FormLabel>}

      <InputGroup>
        {leftElement && (
          <InputLeftElement
            height="full"
            alignItems="center"
            justifyContent="center"
          >
            {leftElement}
          </InputLeftElement>
        )}
        <ChakraInput
          height="50px"
          minHeight="50px"
          backgroundColor="white"
          _hover={{
            borderColor: 'green.600'
          }}
          focusBorderColor="green.600"
          borderRadius="sm"
          {...props}
        />
        {rightElement && (
          <InputRightElement
            height="full"
            alignItems="center"
            justifyContent="center"
          >
            {rightElement}
          </InputRightElement>
        )}
      </InputGroup>

      {errorMessage && (
        <FormHelperText color="red.500">{errorMessage}</FormHelperText>
      )}

      {helperMessage && <FormHelperText>{helperMessage}</FormHelperText>}
    </FormControl>
  );
};

export const InputPassword: React.FC<Props> = (props) => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow((state) => !state);

  return (
    <Input
      {...props}
      type={show ? 'text' : 'password'}
      rightElement={
        show ? (
          <Icon
            as={PasswordHideIcon}
            color="blackAlpha.700"
            size="18"
            cursor="pointer"
            onClick={() => handleClick()}
          />
        ) : (
          <Icon
            as={PasswordShowIcon}
            color="blackAlpha.700"
            size="18"
            cursor="pointer"
            onClick={() => handleClick()}
          />
        )
      }
    />
  );
};

export const InputEmail: React.FC<Props> = (props) => {
  return (
    <Input
      {...props}
      type={'email'}
      rightElement={<Icon as={EmailIcon} color="blackAlpha.700" size="18" />}
    />
  );
};
