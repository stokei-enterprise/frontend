import { useToast } from '@chakra-ui/react';
import React, { useCallback } from 'react';
import { mapToastData, ToastData } from '~/components/ui/toast';

export type AlertModel = ToastData;

export interface AlertsContextValues {
  readonly addAlert?: (alert: AlertModel) => void;
}

export const AlertsContext = React.createContext({} as AlertsContextValues);

export const useAlerts = () => useAlerts();

const AlertsContextProvider: React.FC = ({ children }) => {
  const toast = useToast();

  const addAlert = useCallback(
    (alert: AlertModel) => {
      toast(mapToastData(alert));
    },
    [toast]
  );

  return (
    <AlertsContext.Provider
      value={{
        addAlert
      }}
    >
      {children}
    </AlertsContext.Provider>
  );
};

export default AlertsContextProvider;
