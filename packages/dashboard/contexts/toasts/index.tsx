import { useToast } from '@chakra-ui/react';
import React, { useCallback, useContext } from 'react';
import { mapToastData, ToastData } from '~/components/ui/toast';

export interface ToastsContextValues {
  readonly addToast?: (toast: ToastData) => void;
}

export const ToastsContext = React.createContext({} as ToastsContextValues);

export const useToasts = () => useContext(ToastsContext);

const ToastsContextProvider: React.FC = ({ children }) => {
  const toast = useToast();

  const addToast = useCallback(
    (toastData: ToastData) => {
      toast(mapToastData(toastData));
    },
    [toast]
  );

  return (
    <ToastsContext.Provider
      value={{
        addToast
      }}
    >
      {children}
    </ToastsContext.Provider>
  );
};

export default ToastsContextProvider;
