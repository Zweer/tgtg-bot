import axios from 'axios';

import { LoginByEmailResponseDto } from '@libs/tooGoodToGo/dtos/auth/loginByEmail.response.dto';
import { LoginByEmailRequestDto } from '@libs/tooGoodToGo/dtos/auth/loginByEmail.request.dto';
import { ListItemsResponseDto } from '@libs/tooGoodToGo/dtos/item/listItems.response.dto';
import { ListItemsRequestDto } from '@libs/tooGoodToGo/dtos/item/listItems.request.dto';

import { Item } from '@libs/tooGoodToGo/models/item';

type Endpoints = 'loginByEmail' | 'listItems';

export class TooGoodToGo {
  private token: string;

  private userId: string;

  private latitude: number;

  private longitude: number;

  private static BASEURL = 'https://apptoogoodtogo.com';

  private static ENDPOINTS: { [key in Endpoints]: string } = {
    loginByEmail: 'api/auth/v2/loginByEmail',
    listItems: 'api/item/v7/',
  };

  constructor(private email: string, private password: string) {}

  private async send<T, U = {}>(endpoint: Endpoints, body: U): Promise<T> {
    const { data } = await axios.post(`${TooGoodToGo.BASEURL}/${TooGoodToGo.ENDPOINTS[endpoint]}`, body, {
      headers: {
        Authorization: this.token ? `Bearer ${this.token}` : '',
      },
    });

    return data;
  }

  private async login(): Promise<void> {
    if (this.token) {
      return;
    }

    const data = await this.send<LoginByEmailResponseDto, LoginByEmailRequestDto>('loginByEmail', {
      email: this.email,
      password: this.password,
      device_type: 'ANDROID',
    });

    this.token = data.access_token;
    this.userId = data.startup_data.user.user_id;
    this.latitude = (data.startup_data.user_settings.bound_ne.latitude + data.startup_data.user_settings.bound_sw.latitude) / 2;
    this.longitude = (data.startup_data.user_settings.bound_ne.longitude + data.startup_data.user_settings.bound_sw.longitude) / 2;
  }

  async listItems(): Promise<Item[]> {
    await this.login();
    const items = [];

    for (let page = 1, moreItems = true; moreItems; page += 1) {
      // eslint-disable-next-line no-await-in-loop
      const partialItems = await this.send<ListItemsResponseDto, ListItemsRequestDto>('listItems', {
        user_id: this.userId,
        origin: { latitude: this.latitude, longitude: this.longitude },
        radius: 21,
        page_size: 20,
        page,
        discover: false,
        favorites_only: true,
        item_categories: [],
        diet_categories: [],
        pickup_earliest: null,
        pickup_latest: null,
        search_phrase: null,
        with_stock_only: false,
        hidden_only: false,
        we_care_only: false,
      });

      if (partialItems?.items?.length > 0) {
        items.push(...partialItems.items);
      } else {
        moreItems = false;
      }
    }

    return items.map((item) => Item.factory(item));
  }
}
