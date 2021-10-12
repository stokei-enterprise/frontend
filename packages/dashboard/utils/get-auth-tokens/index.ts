import { parseCookies } from 'nookies';

export const COOKIE_TOKEN_NAME = 'stk-token';
export const getAccessToken = (ctx?: any) => {
  const cookies = parseCookies(ctx);
  return cookies[COOKIE_TOKEN_NAME];
};
