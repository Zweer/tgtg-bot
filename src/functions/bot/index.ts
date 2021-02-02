import type { AWS } from '@serverless/typescript';

const slsFunction: AWS['functions'][string] = {
  handler: `${__dirname.split(process.cwd())[1].substring(1)}/handler.main`,
  events: [{
    http: {
      method: 'post',
      path: 'telegram',
    },
  }],
};

export default slsFunction;
