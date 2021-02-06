import { RetrieveUserResponseDto } from '@libs/tooGoodToGo/dtos/user/retrieveUser.response.dto';
import { RetrieveUserSettingsResponseDto } from '@libs/tooGoodToGo/dtos/user/retrieveUserSettings.response.dto';

export interface LoginByEmailResponseDto {
  access_token: string;
  refresh_token: string;
  startup_data: {
    user: RetrieveUserResponseDto,
    app_settings: {
      on_app_open_message: string; // "BLOCKING",
      open_message_type: string; // "BLOCKING",
      open_message_url: string; // "https://space.toogoodtogo.com/app-update/apple",
      countries: {
        country_iso_code: string;
        terms_url: string;
        privacy_url: string;
      }[];
      purchase_rating_start: string; // "06:00:00",
      purchase_rating_end: string; // "23:00:00",
      purchase_rating_delay: number; // 5400.000000000
    },
    user_settings: RetrieveUserSettingsResponseDto,
    orders: {
      current_time: string; // "2021-02-01T15:47:12.043075Z",
      has_more: boolean;
      orders: [];
    }
  }
}
