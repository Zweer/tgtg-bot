export interface LoginByEmailResponseDto {
  access_token: string;
  refresh_token: string;
  startup_data: {
    user: {
      user_id: string;
      name: string;
      country_id: string;
      email: string;
      phone_country_code: string;
      phone_number: string;
      role: string;
      is_partner: boolean;
      newsletter_opt_in: boolean;
      push_notifications_opt_in: boolean;
    },
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
    user_settings: {
      country_iso_code: string;
      phone_country_code_suggestion: string;
      is_user_email_verified: boolean;
      terms_url: string;
      privacy_url: string;
      contact_form_url: string;
      blog_url: string;
      careers_url: string;
      education_url: string;
      instagram_url: string;
      store_signup_url: string;
      store_contact_url: string;
      bound_sw: {
        longitude: number;
        latitude: number;
      },
      bound_ne: {
        longitude: number;
        latitude: number;
      },
      meals_saved: {
        country_iso_code: string;
        share_url: string;
        image_url: string;
        meals_saved_last_month: number;
        month: number;
        year: number;
      },
      has_any_vouchers: boolean;
    },
    orders: {
      current_time: string; // "2021-02-01T15:47:12.043075Z",
      has_more: boolean;
      orders: [];
    }
  }
}
