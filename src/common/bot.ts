import { Telegraf } from 'telegraf';

const token = process.env.TELEGRAM_TOKEN;
if (!token) {
  throw new Error('TELEGRAM_TOKEN must be provided!');
}

export const bot = new Telegraf(token, {
  telegram: { webhookReply: true },
});
