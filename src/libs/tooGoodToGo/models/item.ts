import { ListItemsResponseDto } from '@libs/tooGoodToGo/dtos/item/listItems.response.dto';

export class Item {
  id: string;
  name: string;
  store: {
    id: string;
    name: string;
    address: string;
    latitude: number;
    longitude: number,
  };
  price: number;
  priceCode: string;
  value: number;
  pickupStart: string;
  pickupEnd: string;
  itemsAvailable: number;
  image: string;
  logo: string;

  static factory(rawItem: ListItemsResponseDto['items'][number]): Item {
    const item = new Item();

    item.id = rawItem.item.item_id;
    item.name = rawItem.display_name;

    item.store = {
      id: rawItem.store.store_id,
      name: rawItem.store.store_name,
      address: rawItem.store.store_location.address.address_line,
      latitude: rawItem.store.store_location.location.latitude,
      longitude: rawItem.store.store_location.location.longitude,
    };

    item.price = rawItem.item.price_including_taxes.minor_units / Math.pow(10, rawItem.item.price_including_taxes.decimals);
    item.priceCode = rawItem.item.price_including_taxes.code;
    item.value = rawItem.item.value_including_taxes.minor_units / Math.pow(10, rawItem.item.value_including_taxes.decimals);

    item.pickupStart = rawItem.pickup_interval?.start;
    item.pickupEnd = rawItem.pickup_interval?.end;

    item.itemsAvailable = rawItem.items_available;

    item.image = rawItem.item.cover_picture.current_url;
    item.logo = rawItem.item.logo_picture.current_url;

    return item;
  }
}
