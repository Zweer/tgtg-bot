import { createHash } from 'crypto';

import { bot, itemsListToMessage } from '@common/bot';
import { User } from '@models/user';

function hashObj(obj: any) {
  return createHash('sha256')
    .update(JSON.stringify(obj))
    .digest('hex');
}

export const main = async () => {
  // eslint-disable-next-line no-restricted-syntax
  for await (const user of User.query<User>({ remind: true })) {
    const items = await user.tooGoodToGo.listItems();
    const newHash = hashObj(items);
    const oldHash = user.itemsHash;

    console.log('user:', user.email);
    console.log('new hash:', newHash);
    console.log('old hash:', oldHash);

    if (newHash !== oldHash) {
      user.itemsHash = newHash;
      await user.put();

      await bot.telegram.sendMessage(user.id, itemsListToMessage(items), { parse_mode: 'HTML' });
    }
  }
};
