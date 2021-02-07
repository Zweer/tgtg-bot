import { Telegraf, Scenes } from 'telegraf';
import { Item } from '@libs/tooGoodToGo/models/item';

const token = process.env.TELEGRAM_TOKEN;
if (!token) {
  throw new Error('TELEGRAM_TOKEN must be provided!');
}

export const bot = new Telegraf<Scenes.WizardContext>(token, {
  telegram: { webhookReply: true },
});

export const itemsListToMessage = (items: Item[]): string => {
  const messages = [
    'Here is the list of your favourite places:',
    ...items.map((item) => [
      `\\- ${item.name}`,
      `  ~${item.value}~ ${item.price} ${item.priceCode}`,
      // eslint-disable-next-line no-nested-ternary
      `  ${item.itemsAvailable > 0 ? `${(item.itemsAvailable < 5 ? '*only* ' : '')}${item.itemsAvailable}` : 'nothing'} available`,
    ]),
  ]
    .flat();

  return messages.join('\n');
};
