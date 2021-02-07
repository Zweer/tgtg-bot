import type { AWS } from '@serverless/typescript';

import { DYNAMODB_TABLE_USERS, TELEGRAM_TOKEN } from '../bot';

const slsFunction: AWS['functions'][string] = {
  handler: `${__dirname.split(process.cwd())[1].substring(1)}/handler.main`,
  events: [{
    schedule: 'rate(5 minutes)',
  }],
  environment: { DYNAMODB_TABLE_USERS, TELEGRAM_TOKEN },
};

export default slsFunction;
