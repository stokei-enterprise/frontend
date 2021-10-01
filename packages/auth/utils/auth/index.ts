import { addHours } from 'date-fns';
import nookies, { parseCookies } from 'nookies';
import { isProduction } from '~/environments';

const TOKEN = 'stk-token';
const stokeiCookieDomain: string = isProduction ? 'stokei.com' : undefined;
const stokeiAppCookieDomain: string = isProduction ? 'stokei.app' : undefined;

export const getToken = (ctx?: any) => {
  const cookies = parseCookies(ctx);
  return cookies[TOKEN];
};
export const removeToken = (ctx?: any) => {
  nookies.destroy(ctx, TOKEN, {
    domain: stokeiAppCookieDomain
  });
  nookies.destroy(ctx, TOKEN, {
    domain: stokeiCookieDomain
  });
};

export const setToken = (value: string, ctx?: any) => {
  const options = {
    expires: addHours(Date.now(), 12),
    secure: isProduction,
    sameSite: true
  };

  nookies.set(ctx, TOKEN, value, {
    ...options,
    domain: stokeiCookieDomain
  });
  nookies.set(ctx, TOKEN, value, {
    ...options,
    domain: stokeiAppCookieDomain
  });
};

export const authHeader = (): object => {
  const accessToken = getToken();
  if (accessToken) {
    return {
      authorization: `Bearer ${accessToken}`
    };
  }
  return {};
};
