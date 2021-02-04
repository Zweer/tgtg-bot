import type { AWS } from '@serverless/typescript';

export const path = 'telegram';
// eslint-disable-next-line no-template-curly-in-string
export const TELEGRAM_TOKEN = '${ssm:/aws/reference/secretsmanager/${self:provider.stage}/${self:service}/telegram~true}';

const slsFunction: AWS['functions'][string] = {
  handler: `${__dirname.split(process.cwd())[1].substring(1)}/handler.main`,
  events: [{
    http: {
      path,
      method: 'post',
      operationId: 'botHandler',
    },
  }],
  environment: {
    // eslint-disable-next-line no-template-curly-in-string
    DYNAMODB_TABLE_TELEGRAF_SESSIONS: '${self:custom.resourceNames.tables.telegrafSessions}',
    TELEGRAM_TOKEN,
  },
};

export default slsFunction;
