import axios from 'axios';

import { LoginByEmailResponseDto } from '@libs/tooGoodToGo/dtos/auth/loginByEmail.response.dto';
import { LoginByEmailRequestDto } from '@libs/tooGoodToGo/dtos/auth/loginByEmail.request.dto';
import { ListItemsResponseDto } from '@libs/tooGoodToGo/dtos/item/listItems.response.dto';
import { ListItemsRequestDto } from '@libs/tooGoodToGo/dtos/item/listItems.request.dto';

import { Item } from '@libs/tooGoodToGo/models/item';
import { RefreshTokenResponseDto } from '@libs/tooGoodToGo/dtos/auth/refreshToken.response.dto';
import { RefreshTokenRequestDto } from '@libs/tooGoodToGo/dtos/auth/refreshToken.request.dto';
import { RetrieveUserSettingsResponseDto } from '@libs/tooGoodToGo/dtos/user/retrieveUserSettings.response.dto';
import { RetrieveUserResponseDto } from '@libs/tooGoodToGo/dtos/user/retrieveUser.response.dto';

type Endpoints = 'loginByEmail' | 'listItems' | 'retrieveUser' | 'retrieveUserSettings' | 'refreshToken';

export class TooGoodToGo {
  accessToken: string;

  refreshToken: string;

  private userId: string;

  private latitude: number;

  private longitude: number;

  private static BASEURL = 'https://apptoogoodtogo.com';

  private static ENDPOINTS: { [key in Endpoints]: string } = {
    loginByEmail: 'api/auth/v2/loginByEmail',
    listItems: 'api/item/v7/',
    retrieveUser: 'api/user/v1/',
    retrieveUserSettings: 'api/app/v1/user_settings',
    refreshToken: 'api/auth/v2/token/refresh',
  };

  private async send<T, U = null>(endpoint: Endpoints, body: U = null): Promise<T> {
    const { data } = await axios.post(`${TooGoodToGo.BASEURL}/${TooGoodToGo.ENDPOINTS[endpoint]}`, body, {
      headers: {
        Authorization: this.accessToken ? `Bearer ${this.accessToken}` : '',
        'User-Agent': 'TGTG/20.12.3 Dalvik/2.1.0 (Linux; U; Android 6.0.1; Nexus 5 Build/M4B30Z)',
      },
    });

    return data;
  }

  async login(email: string, password: string): Promise<{ user: RetrieveUserResponseDto, userSettings: RetrieveUserSettingsResponseDto }> {
    const data = await this.send<LoginByEmailResponseDto, LoginByEmailRequestDto>('loginByEmail', {
      email,
      password,
      device_type: 'ANDROID',
    });

    this.accessToken = data.access_token;
    this.refreshToken = data.refresh_token;
    this.setUserProperties(data.startup_data.user);
    this.setUserSettingsProperties(data.startup_data.user_settings);

    return {
      user: data.startup_data.user,
      userSettings: data.startup_data.user_settings,
    };
  }

  private setUserProperties(user: RetrieveUserResponseDto): void {
    this.userId = user.user_id;
  }

  private setUserSettingsProperties(userSettings: RetrieveUserSettingsResponseDto): void {
    this.latitude = (userSettings.bound_ne.latitude + userSettings.bound_sw.latitude) / 2;
    this.longitude = (userSettings.bound_ne.longitude + userSettings.bound_sw.longitude) / 2;
  }

  async refreshAccessToken(): Promise<void> {
    const data = await this.send<RefreshTokenResponseDto, RefreshTokenRequestDto>('refreshToken', {
      refresh_token: this.refreshToken,
    });

    this.accessToken = data.access_token;
    this.refreshToken = data.refresh_token;
  }

  async listItems(): Promise<Item[]> {
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

  async retrieveUser(): Promise<RetrieveUserResponseDto> {
    const data = await this.send<RetrieveUserResponseDto>('retrieveUser');

    this.setUserProperties(data);

    return data;
  }

  async retrieveUserSettings(): Promise<RetrieveUserSettingsResponseDto> {
    const data = await this.send<RetrieveUserSettingsResponseDto>('retrieveUserSettings');

    this.setUserSettingsProperties(data);

    return data;
  }
}
