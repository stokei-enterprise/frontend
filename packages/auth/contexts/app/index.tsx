import { useRouter } from 'next/router';
import React, { useMemo } from 'react';
import { useApp } from '~/hooks/use-app';
import { AppModel } from '~/services/@types/app';

export interface AppContextValues {
  readonly app: AppModel;
  readonly appId: string;
  readonly baseUrl: string;
  readonly loading: boolean;
}

interface Props {}

export const AppContext = React.createContext<AppContextValues>(
  {} as AppContextValues
);

const AppContextProvider: React.FC<Props> = ({ children }) => {
  const router = useRouter();

  const appId = useMemo(() => {
    if (router?.query?.appId && router?.query?.appId !== 'undefined') {
      return (router?.query?.appId + '').trim();
    }
    return '';
  }, [router]);

  const { app, loading } = useApp({ appId });

  return (
    <AppContext.Provider
      value={{
        app,
        appId,
        loading,
        baseUrl: appId ? `/apps/${appId}` : ''
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
