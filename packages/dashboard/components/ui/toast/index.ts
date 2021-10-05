import { UseToastOptions } from '@chakra-ui/react';

export interface ToastData {
  readonly title?: string;
  readonly text: string;
  readonly status: 'info' | 'warning' | 'success' | 'error';
}

export const mapToastData = (data: ToastData): UseToastOptions => ({
  title: data?.title,
  description: data?.text,
  duration: 3000,
  status: data.status,
  isClosable: true,
  variant: 'subtle',
  position: 'bottom-right'
});
