import { Context } from 'telegraf';

import { User } from '@models/user';
import { itemsListToMessage } from '@common/bot';

export const listAction = 'list';

export const listHandler = async (ctx: Context) => {
  const user = await User.retrieve(`${ctx.message.chat.id}`);

  if (!user) {
    await ctx.reply('You have to first register your credentials. Write /start to register');

    return;
  }

  const items = await user.tooGoodToGo.listItems();
  const message = itemsListToMessage(items);

  await ctx.replyWithHTML(message);
};
