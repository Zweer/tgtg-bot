import 'source-map-support/register';

import DynamoDBSession from 'telegraf-session-dynamodb';

import { bot } from '@common/bot';
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';

import { startSceneId, startStage } from './routes/start';

const dynamoDBSession = new DynamoDBSession({
  dynamoDBConfig: {
    params: {
      TableName: process.env.DYNAMODB_TABLE_TELEGRAF_SESSIONS,
    },
    region: process.env.AWS_REGION,
  },
});
bot.use(dynamoDBSession.middleware());

bot.use(startStage.middleware());

bot.start((ctx) => ctx.scene.enter(startSceneId));
bot.command('list', (ctx) => ctx.reply('This is the list\n- \n- \n- '));

const handleUpdate = async (event) => {
  const success = await bot.handleUpdate(event.body);

  return formatJSONResponse({ success });
};

export const main = middyfy(handleUpdate);
