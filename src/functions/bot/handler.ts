import * as makeHandler from 'lambda-request-handler';

import { bot } from '../common/bot';

bot.start((ctx) => ctx.reply('Hello'));

export const main = makeHandler(bot.webhookCallback('/'));
