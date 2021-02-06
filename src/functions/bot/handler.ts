import 'source-map-support/register';

import DynamoDBSession from 'telegraf-session-dynamodb';

import { bot } from '@common/bot';
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';

import { listAction, listHandler } from './routes/list';
import { remindAction, remindHandler } from './routes/remind';
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
bot.action(listAction, listHandler);
bot.command(listAction, listHandler);
bot.action(remindAction, remindHandler);
bot.command(remindAction, remindHandler);

const handleUpdate = async (event) => {
  const success = await bot.handleUpdate(event.body);

  return formatJSONResponse({ success });
};

export const main = middyfy(handleUpdate);
