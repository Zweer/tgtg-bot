export interface ListItemsResponseDto {
  items: {
      item: {
        item_id: string;
        price: {
          code: string;
          minor_units: number;
          decimals: number;
        },
        sales_taxes: [],
        tax_amount: {
          code: string;
          minor_units: number;
          decimals: number;
        },
        price_excluding_taxes: {
          code: string;
          minor_units: number;
          decimals: number;
        },
        price_including_taxes: {
          code: string;
          minor_units: number;
          decimals: number;
        },
        value_excluding_taxes: {
          code: string;
          minor_units: number;
          decimals: number;
        },
        value_including_taxes: {
          code: string;
          minor_units: number;
          decimals: number;
        },
        taxation_policy: string;
        show_sales_taxes: boolean;
        cover_picture: {
          picture_id: string;
          current_url: string;
        },
        logo_picture: {
          picture_id: string;
          current_url: string;
        },
        name: string;
        description: string;
        can_user_supply_packaging: boolean;
        packaging_option: string;
        collection_info: string;
        diet_categories: [];
        item_category: string;
        badges: {
          badge_type: string;
          rating_group: string;
          percentage: number;
          user_count: number;
          month_count: number;
        }[];
        positive_rating_reasons: string[];
        favorite_count: number;
        buffet: boolean;
      };
      store: {
        store_id: string;
        store_name: string;
        branch: string;
        description: string;
        tax_identifier: string;
        website: string;
        store_location: {
          address: {
            country: {
              iso_code: string;
              name: string;
            };
            address_line: string;
            city: string;
            postal_code: string;
          };
          location: {
            longitude: number;
            latitude: number;
          };
        },
        store_time_zone: string;
        hidden: boolean;
        favorite_count: number;
        we_care: boolean;
      };
      display_name: string;
      pickup_interval: {
        start: string; // "2021-02-02T11:00:00Z",
        end: string; // "2021-02-02T14:00:00Z"
      };
      pickup_location: {
        address: {
          country: {
            iso_code: string;
            name: string;
          };
          address_line: string;
          city: string;
          postal_code: string;
        };
        location: {
          longitude: number;
          latitude: number;
        };
      };
      purchase_end: string; // "2021-02-02T14:00:00Z",
      items_available: number; // 5,
      distance: number;
      favorite: boolean; // true,
      in_sales_window: boolean; // true,
      new_item: boolean; // false
    }[];
}
