import type { AWS } from '@serverless/typescript';

import { path, TELEGRAM_TOKEN } from '../bot';

const slsFunction: AWS['functions'][string] = {
  handler: `${__dirname.split(process.cwd())[1].substring(1)}/handler.main`,
  environment: {
    TELEGRAM_TOKEN,
    API_URL: {
      'Fn::Join': [
        '',
        [
          'https://',
          {
            Ref: 'ApiGatewayRestApi',
          },
          '.execute-api.',
          {
            Ref: 'AWS::Region',
          },
          '.',
          {
            Ref: 'AWS::URLSuffix',
          },
          // eslint-disable-next-line no-template-curly-in-string
          '/${self:provider.stage}/',
          path,
        ],
      ],
    },
  },
};

export default slsFunction;
