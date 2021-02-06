import {
  attribute,
  hashKey,
  table,
} from '@aws/dynamodb-data-mapper-annotations';

import { TooGoodToGo } from '@libs/tooGoodToGo';
import { RetrieveUserResponseDto } from '@libs/tooGoodToGo/dtos/user/retrieveUser.response.dto';
import { RetrieveUserSettingsResponseDto } from '@libs/tooGoodToGo/dtos/user/retrieveUserSettings.response.dto';

import { AbstractModel } from './abstract.model';

@table(process.env.DYNAMODB_TABLE_USERS)
export class User extends AbstractModel {
  @hashKey()
  id: string;

  @attribute()
  email: string;

  @attribute()
  accessToken: string;

  @attribute()
  refreshToken: string;

  tooGoodToGo: TooGoodToGo;

  async createTooGoodToGo(email: string, password: string): Promise<{ user: RetrieveUserResponseDto, userSettings: RetrieveUserSettingsResponseDto }> {
    this.email = email;
    this.tooGoodToGo = new TooGoodToGo();

    const data = await this.tooGoodToGo.login(email, password);

    this.accessToken = this.tooGoodToGo.accessToken;
    this.refreshToken = this.tooGoodToGo.refreshToken;

    return data;
  }

  async setTooGoodToGo(): Promise<{ user: RetrieveUserResponseDto, userSettings: RetrieveUserSettingsResponseDto }> {
    this.tooGoodToGo = Object.assign(new TooGoodToGo(), {
      accessToken: this.accessToken,
      refreshToken: this.refreshToken,
    });

    await this.tooGoodToGo.refreshAccessToken();
    const user = await this.tooGoodToGo.retrieveUser();
    const userSettings = await this.tooGoodToGo.retrieveUserSettings();

    return { user, userSettings };
  }
}
