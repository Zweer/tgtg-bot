import {
  attribute,
  hashKey,
  table,
} from '@aws/dynamodb-data-mapper-annotations';

import { AbstractModel } from './abstract.model';

@table(process.env.DYNAMODB_TABLE_USERS)
export class User extends AbstractModel {
  @hashKey()
  id: string;

  @attribute()
  email: string;

  @attribute()
  accessToken: string;

  @attribute()
  refreshToken: string;
}
