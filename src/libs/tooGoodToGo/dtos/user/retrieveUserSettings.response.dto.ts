export interface RetrieveUserSettingsResponseDto {
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
}
