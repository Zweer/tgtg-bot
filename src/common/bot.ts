import { Telegraf } from 'telegraf';
import { SceneContext } from 'telegraf/typings/scenes';

const token = process.env.TELEGRAM_TOKEN;
if (!token) {
  throw new Error('TELEGRAM_TOKEN must be provided!');
}

export const bot = new Telegraf<SceneContext>(token, {
  telegram: { webhookReply: true },
});
