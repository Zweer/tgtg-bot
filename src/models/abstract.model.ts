import * as DynamoDB from 'aws-sdk/clients/dynamodb';
import { DataMapper, PutOptions } from '@aws/dynamodb-data-mapper';
import { GetOptions } from '@aws/dynamodb-data-mapper/build/namedParameters';

const client = new DynamoDB();
const mapper = new DataMapper({ client });

export class AbstractModel {
  static async get<T>(item: T, options?: GetOptions): Promise<T> {
    return mapper.get<T>(Object.assign(new this(), item), options);
  }

  async put<T>(options?: PutOptions) {
    return mapper.put<T>(this as any, options);
  }
}
