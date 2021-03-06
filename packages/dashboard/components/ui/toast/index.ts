import { ReactNode } from 'react';
import { UseToastOptions, RenderProps } from '@chakra-ui/react';

export interface ToastData {
  readonly title?: string;
  readonly text: string;
  readonly status: 'info' | 'warning' | 'success' | 'error';
  readonly render: (props: RenderProps) => ReactNode;
}

export const mapToastData = (data: ToastData): UseToastOptions => ({
  title: data?.title,
  description: data?.text,
  duration: 5000,
  status: data.status,
  isClosable: true,
  variant: 'subtle',
  position: 'bottom-right',
  render: data?.render || undefined
});
