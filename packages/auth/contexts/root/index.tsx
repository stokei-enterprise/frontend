import { useRouter } from 'next/router';
import React, { useMemo } from 'react';

export interface RootContextValues {
  readonly redirectUri: string;
  readonly appId: string;
  readonly homeUri: string;
  readonly loginUri: string;
  readonly signUpUri: string;
  readonly forgotPasswordUri: string;
}

interface Props {}

export const RootContext = React.createContext<RootContextValues>(
  {} as RootContextValues
);

const RootContextProvider: React.FC<Props> = ({ children }) => {
  const router = useRouter();

  const redirectUri = useMemo(() => {
    if (
      router?.query?.redirectUri &&
      router?.query?.redirectUri !== 'undefined'
    ) {
      return (router?.query?.redirectUri + '').trim();
    }
    return '';
  }, [router]);

  const appId = useMemo(() => {
    if (router?.query?.appId && router?.query?.appId !== 'undefined') {
      return (router?.query?.appId + '').trim();
    }
    return '';
  }, [router]);

  const queryParams = useMemo(() => {
    if (!redirectUri && !appId) {
      return '';
    }
    const items = [];
    if (appId) {
      items.push(`appId=${appId}`);
    }
    if (redirectUri) {
      items.push(`redirectUri=${redirectUri}`);
    }
    return '?' + items.join('&');
  }, [redirectUri, appId]);

  const homeUri = useMemo(() => {
    return '/' + queryParams;
  }, [queryParams]);

  const loginUri = useMemo(() => {
    return '/' + queryParams;
  }, [queryParams]);

  const signUpUri = useMemo(() => {
    return '/signup' + queryParams;
  }, [queryParams]);

  const forgotPasswordUri = useMemo(() => {
    return '/password/forgot' + queryParams;
  }, [queryParams]);

  return (
    <RootContext.Provider
      value={{
        redirectUri,
        appId,
        homeUri,
        loginUri,
        signUpUri,
        forgotPasswordUri
      }}
    >
      {children}
    </RootContext.Provider>
  );
};

export default RootContextProvider;
