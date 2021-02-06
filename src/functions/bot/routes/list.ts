import { Context } from 'telegraf';

import { User } from '@models/user';

export const listAction = 'list';

export const listHandler = async (ctx: Context) => {
  const user = await User.retrieve(`${ctx.message.chat.id}`);

  if (!user) {
    await ctx.reply('You have to first register your credentials. Write /start to register');

    return;
  }

  const items = await user.tooGoodToGo.listItems();

  const messages = [
    'Here is the list of your favourite places:',
    ...items.map((item) => [
      `- ${item.name}`,
      `  ~${item.value}~ ${item.price} ${item.priceCode}`,
      // eslint-disable-next-line no-nested-ternary
      `  ${item.itemsAvailable > 0 ? `${(item.itemsAvailable < 5 ? '*only* ' : '')}${item.itemsAvailable}` : 'nothing'} available`,
    ]),
  ]
    .flat();

  await ctx.replyWithMarkdownV2(messages.join('\n'));
};
