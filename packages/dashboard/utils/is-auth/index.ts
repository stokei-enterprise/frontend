import { clientRestApi } from '~/services/rest-api';
import { desconnectedUrl } from '../constants';

export interface AuthValidateAndRedirectData {
  readonly context: any;
}

export const getAuth = async (data: AuthValidateAndRedirectData) => {
  let user = null;
  let appId = null;

  try {
    const meService = clientRestApi({ context: data.context }).me();
    appId = meService.appId;
    if (!meService.accessToken) {
      return {
        user: null,
        redirect: {
          destination: desconnectedUrl(appId),
          permanent: false
        }
      };
    }
    user = (await meService.load())?.data;
  } catch (error) {}

  if (!user) {
    return {
      user,
      appId,
      redirect: {
        destination: desconnectedUrl(appId),
        permanent: false
      }
    };
  }

  return {
    user,
    appId
  };
};
