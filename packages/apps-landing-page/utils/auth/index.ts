import { parseCookies } from 'nookies';

export const COOKIE_TOKEN_NAME = 'stk-token';

export const getToken = (ctx?: any) => {
  const cookies = parseCookies(ctx);
  return cookies[COOKIE_TOKEN_NAME];
};
