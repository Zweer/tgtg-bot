/* eslint-disable no-template-curly-in-string */

import type { AWS } from '@serverless/typescript';

import { bot, botSetWebhook } from './src/functions';

const serverlessConfiguration: AWS = {
  service: 'tgtg',
  frameworkVersion: '2',
  custom: {
    webpack: {
      webpackConfig: './webpack.config.js',
      includeModules: true,
    },
    resourceNames: {
      tables: {
        telegrafSessions: '${self:service}-${self:provider.stage}-telegrafSessions',
        users: '${self:service}-${self:provider.stage}-users',
      },
    },
  },
  plugins: ['serverless-webpack'],
  provider: {
    name: 'aws',
    runtime: 'nodejs12.x',
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
    iamRoleStatements: [{
      Effect: 'Allow',
      Action: [
        'dynamodb:DeleteItem',
        'dynamodb:GetItem',
        'dynamodb:PutItem',
        'dynamodb:UpdateItem',
      ],
      Resource: [{
        'Fn::GetAtt': ['TelegrafSessionsTable', 'Arn'],
      }, {
        'Fn::GetAtt': ['UsersTable', 'Arn'],
      }],
    }],
  },
  functions: { bot, botSetWebhook },
  resources: {
    Resources: {
      TelegrafSessionsTable: {
        Type: 'AWS::DynamoDB::Table',
        Properties: {
          TableName: '${self:custom.resourceNames.tables.telegrafSessions}',
          AttributeDefinitions: [{
            AttributeName: 'SessionKey',
            AttributeType: 'S',
          }],
          KeySchema: [{
            AttributeName: 'SessionKey',
            KeyType: 'HASH',
          }],
          ProvisionedThroughput: {
            ReadCapacityUnits: 1,
            WriteCapacityUnits: 1,
          },
        },
      },
      UsersTable: {
        Type: 'AWS::DynamoDB::Table',
        Properties: {
          TableName: '${self:custom.resourceNames.tables.users}',
          AttributeDefinitions: [{
            AttributeName: 'id',
            AttributeType: 'S',
          }],
          KeySchema: [{
            AttributeName: 'id',
            KeyType: 'HASH',
          }],
          ProvisionedThroughput: {
            ReadCapacityUnits: 1,
            WriteCapacityUnits: 1,
          },
        },
      },
    },
  },
};

module.exports = serverlessConfiguration;
