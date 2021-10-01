import {
  FormControl,
  FormHelperText,
  FormLabel,
  Select as ChakraSelect,
  SelectProps as ChakraSelectProps,
  Text
} from '@chakra-ui/react';
import React from 'react';

interface Props extends ChakraSelectProps {
  readonly label?: string;
  readonly required?: boolean;
  readonly helperMessage?: string;
  readonly errorMessage?: string;
}

export const Select: React.FC<Props> = ({
  label,
  required = true,
  helperMessage,
  errorMessage,
  ...props
}) => {
  return (
    <FormControl id={props.id} marginBottom={2}>
      {label && (
        <FormLabel>
          {label}
          {required && (
            <Text as="span" marginLeft={3} color="gray.500" fontWeight="normal">
              (Obrigatório)
            </Text>
          )}
        </FormLabel>
      )}

      <ChakraSelect
        size="md"
        backgroundColor="white"
        _hover={{
          borderColor: 'green.600'
        }}
        focusBorderColor="green.600"
        borderRadius="sm"
        {...props}
      />

      {errorMessage && (
        <FormHelperText color="red.500">{errorMessage}</FormHelperText>
      )}

      {helperMessage && <FormHelperText>{helperMessage}</FormHelperText>}
    </FormControl>
  );
};

export default Select;
