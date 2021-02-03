import * as makeHandler from 'lambda-request-handler';

import { bot } from '../common/bot';

bot.start((ctx) => ctx.reply('Hello'));

export const mainn = makeHandler(bot.webhookCallback('/dev/telegram'));

export const main = async (event) => {
  console.log(event);

  const body = JSON.parse(event.body);

  console.log(body);

  const success = await bot.handleUpdate(body);

  return {
    statusCode: 200,
    body: JSON.stringify({ success }),
  };
};
