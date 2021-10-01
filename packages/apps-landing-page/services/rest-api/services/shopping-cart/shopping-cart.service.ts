import { ShoppingCartModel } from '~/services/@types/shopping-cart';
import { getCookieCartId, setCookieCartId } from '~/utils/carts-cookies';
import { BaseService, BaseServiceConfig } from '../base-service';

export interface ShoppingCartServiceConfig extends BaseServiceConfig {}

export class ShoppingCartServiceRest extends BaseService {
  constructor(data: ShoppingCartServiceConfig) {
    super(data);
  }

  private async create(): Promise<ShoppingCartModel> {
    try {
      const response = await this.client.get<ShoppingCartModel>(`/carts`);
      if (response?.data) {
        const cart = response.data;
        await setCookieCartId(cart.id);
        return cart;
      }
    } catch (error) {}
    return null;
  }

  private async getCartId(): Promise<string> {
    try {
      let cartId = getCookieCartId();
      if (!cartId) {
        const cart = await this.create();
        if (!cart) {
          throw new Error('Error creating cart!');
        }
        return cart.id;
      }
      return cartId;
    } catch (error) {}
    return null;
  }

  async load(): Promise<ShoppingCartModel> {
    try {
      const cartId = await this.getCartId();
      const response = await this.client.get<ShoppingCartModel>(
        `/carts/${cartId}`
      );
      if (response?.data) {
        return response.data;
      }
    } catch (error) {}
    return null;
  }

  async addItem(data: {
    priceId: string;
    shoppingCartId: string;
  }): Promise<boolean> {
    try {
      const cartId = await this.getCartId();
      const response = await this.client.post<{ ok: boolean }>(
        `/carts/${cartId}/items`,
        data
      );
      if (response?.data?.ok) {
        return true;
      }
    } catch (error) {}
    return false;
  }
}
