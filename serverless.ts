import type { AWS } from '@serverless/typescript';

import { bot, botSetWebhook } from './src/functions';

const serverlessConfiguration: AWS = {
  service: 'tgtg-bot',
  frameworkVersion: '2',
  custom: {
    webpack: {
      webpackConfig: './webpack.config.js',
      includeModules: true,
    },
  },
  plugins: ['serverless-webpack'],
  provider: {
    name: 'aws',
    runtime: 'nodejs12.x',
    // eslint-disable-next-line no-template-curly-in-string
    stage: '${opt:stage, "dev"}',
    region: 'eu-west-1',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
    },
    lambdaHashingVersion: '20201221',
  },
  functions: { bot, botSetWebhook },
  outputs: {
    ServiceEndpoint: {
      Export: {
        Name: 'API-Endpoint',
      },
    },
  },
};

module.exports = serverlessConfiguration;
