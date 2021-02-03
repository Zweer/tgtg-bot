import * as makeHandler from 'lambda-request-handler';

import { bot } from '../common/bot';

bot.start((ctx) => ctx.reply('Hello'));

console.log(process.env);

export const main = makeHandler(bot.webhookCallback('/dev/telegram'));
