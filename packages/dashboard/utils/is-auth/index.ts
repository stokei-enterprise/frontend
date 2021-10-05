import { clientRestApi } from '~/services/rest-api';
import { desconnectedUrl } from '../constants';

export interface AuthValidateAndRedirectData {
  readonly context: any;
}

export const getAuth = async (data: AuthValidateAndRedirectData) => {
  const meService = clientRestApi({ context: data.context }).me();
  if (!meService.accessToken) {
    return {
      user: null,
      redirect: {
        destination: desconnectedUrl(meService.appId),
        permanent: false
      }
    };
  }
  const user = (await meService.load())?.data;
  if (!user) {
    return {
      user,
      redirect: {
        destination: desconnectedUrl(meService.appId),
        permanent: false
      }
    };
  }
  return {
    user
  };
};
