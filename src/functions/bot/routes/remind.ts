import { Context } from 'telegraf';
import { User } from '@models/user';

export const remindAction = 'remind';

export const remindHandler = async (ctx: Context) => {
  console.log(ctx);

  const user = await User.retrieve(`${ctx.message.chat.id}`);

  user.remind = !user.remind;

  await user.put();

  await ctx.reply(`Remind set to ${user.remind ? 'ON' : 'OFF'}`);
};
