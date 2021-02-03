import type { AWS } from '@serverless/typescript';

export const path = 'telegram';

const slsFunction: AWS['functions'][string] = {
  handler: `${__dirname.split(process.cwd())[1].substring(1)}/handler.main`,
  events: [{
    http: {
      path,
      method: 'post',
      operationId: 'botHandler',
    },
  }],
};

export default slsFunction;
