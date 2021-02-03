import { bot } from '@common/bot';

const { API_URL } = process.env;

export const main = async () => {
  await bot.telegram.setWebhook(API_URL);
};
