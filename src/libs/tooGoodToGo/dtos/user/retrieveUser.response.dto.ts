export interface RetrieveUserResponseDto {
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
}
