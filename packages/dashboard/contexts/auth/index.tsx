import React, { useEffect } from 'react';
import { Api } from '@stokei/core';
import { useAuth } from '~/hooks/use-auth';
import { useState } from 'react';

export interface AuthContextValues {
  readonly user: Api.Rest.UserModel;
  readonly loading: boolean;
  readonly authenticated: boolean;
  readonly setAvatarUrl: (url: string) => void;
}

interface Props {}

export const AuthContext = React.createContext<AuthContextValues>(
  {} as AuthContextValues
);

const AuthContextProvider: React.FC<Props> = ({ children }) => {
  const { user: _user, loading } = useAuth();
  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser(_user);
  }, [_user]);

  const setAvatarUrl = (url: string) => {
    setUser((prev) => ({ ...prev, avatar: url }));
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, authenticated: !!user, setAvatarUrl }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
