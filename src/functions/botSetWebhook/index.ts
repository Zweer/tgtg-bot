import type { AWS } from '@serverless/typescript';

const slsFunction: AWS['functions'][string] = {
  handler: `${__dirname.split(process.cwd())[1].substring(1)}/handler.main`,
  environment: {
    API_URL: {
      'Fn::Join': [
        '',
        [
          'https://',
          {
            Ref: 'bot',
          },
          '.execute-api.',
          {
            Ref: 'AWS::Region',
          },
          '.',
          {
            Ref: 'AWS::URLSuffix',
          },
        ],
      ],
    },
  },
};

export default slsFunction;
