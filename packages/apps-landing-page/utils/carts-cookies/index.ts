import { addHours } from 'date-fns';
import nookies, { parseCookies } from 'nookies';
import { isProduction } from '~/environments';

export const COOKIE_CART_NAME = 'stk-carts';

const stokeiCookieDomain: string = isProduction ? 'stokei.com' : undefined;
const stokeiAppCookieDomain: string = isProduction ? 'stokei.app' : undefined;

export const getCookieCartId = (ctx?: any) => {
  const cookies = parseCookies(ctx);
  return cookies[COOKIE_CART_NAME];
};

export const removeCookieCartId = (ctx?: any) => {
  nookies.destroy(ctx, COOKIE_CART_NAME, {
    domain: stokeiAppCookieDomain
  });
  nookies.destroy(ctx, COOKIE_CART_NAME, {
    domain: stokeiCookieDomain
  });
};

export const setCookieCartId = (value: string, ctx?: any) => {
  const options = {
    expires: addHours(Date.now(), 12),
    secure: isProduction,
    sameSite: true
  };

  nookies.set(ctx, COOKIE_CART_NAME, value, {
    ...options,
    domain: stokeiCookieDomain
  });
  nookies.set(ctx, COOKIE_CART_NAME, value, {
    ...options,
    domain: stokeiAppCookieDomain
  });
};
