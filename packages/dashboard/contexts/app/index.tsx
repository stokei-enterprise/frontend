import { useRouter } from 'next/router';
import React from 'react';
import { useApp } from '~/hooks/use-app';
import { Api } from '@stokei/core';

export interface AppContextValues {
  readonly app: Api.Rest.AppModel;
  readonly baseUrl: string;
  readonly loading: boolean;
}

interface Props {}

export const AppContext = React.createContext<AppContextValues>(
  {} as AppContextValues
);

const AppContextProvider: React.FC<Props> = ({ children }) => {
  const router = useRouter();
  const { app, loading } = useApp({ appId: router?.query?.appId });
  return (
    <AppContext.Provider
      value={{
        app,
        loading,
        baseUrl: router?.query?.appId ? `/apps/${router?.query?.appId}` : ''
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
