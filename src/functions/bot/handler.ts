import 'source-map-support/register';

import { bot } from '@common/bot';
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';

bot.start((ctx) => ctx.reply('Hello'));

const handleUpdate = async (event) => {
  const success = await bot.handleUpdate(event.body);

  return formatJSONResponse({ success });
};

export const main = middyfy(handleUpdate);
