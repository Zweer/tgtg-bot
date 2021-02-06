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

  @attribute()
  remind: boolean;

  tooGoodToGo: TooGoodToGo;

  userInfo: RetrieveUserResponseDto;

  userSettings: RetrieveUserSettingsResponseDto;

  async createTooGoodToGo(email: string, password: string): Promise<void> {
    this.email = email;
    this.tooGoodToGo = new TooGoodToGo();

    const data = await this.tooGoodToGo.login(email, password);

    this.accessToken = this.tooGoodToGo.accessToken;
    this.refreshToken = this.tooGoodToGo.refreshToken;

    this.userInfo = data.user;
    this.userSettings = data.userSettings;
  }

  async setTooGoodToGo(): Promise<void> {
    this.tooGoodToGo = Object.assign(new TooGoodToGo(), {
      accessToken: this.accessToken,
      refreshToken: this.refreshToken,
    });

    await this.tooGoodToGo.refreshAccessToken();
    this.userInfo = await this.tooGoodToGo.retrieveUser();
    this.userSettings = await this.tooGoodToGo.retrieveUserSettings();
  }

  static async retrieve(id: string): Promise<User | null> {
    try {
      const userToRetrieve = Object.assign(new User(), { id });
      const user = await User.get(userToRetrieve);

      if (user.accessToken && user.refreshToken) {
        try {
          await user.setTooGoodToGo();

          return user;
        } catch {
          // Invalid access and refresh tokens
        }
      }
    } catch {
      // User not found
    }

    return null;
  }

  static async create(id: string, email: string, password: string): Promise<User | null> {
    const user = Object.assign(new User(), { id });

    try {
      await user.createTooGoodToGo(email, password);
      await user.put();

      return user;
    } catch {
      // Invalid credentials
    }

    return null;
  }
}
