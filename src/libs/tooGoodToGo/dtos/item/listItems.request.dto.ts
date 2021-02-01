export interface ListItemsRequestDto {
  user_id: string; // "47625395",
  origin: {
    latitude: number;
    longitude: number;
  };
  radius: number; // 21,
  page_size: number; // 20,
  page: number; // 1,
  discover: boolean; // false,
  favorites_only: boolean; // true,
  item_categories: [];
  diet_categories: [];
  pickup_earliest: null;
  pickup_latest: null;
  search_phrase: null;
  with_stock_only: boolean; // false,
  hidden_only: boolean; // false,
  we_care_only: boolean; // false
}
