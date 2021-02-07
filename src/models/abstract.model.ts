import * as DynamoDB from 'aws-sdk/clients/dynamodb';
import { DataMapper, PutOptions } from '@aws/dynamodb-data-mapper';
import {
  GetOptions,
  ParallelScanWorkerOptions,
  QueryOptions,
  ScanOptions,
} from '@aws/dynamodb-data-mapper/build/namedParameters';
import { ScanIterator } from '@aws/dynamodb-data-mapper/build/ScanIterator';
import { QueryIterator } from '@aws/dynamodb-data-mapper/build/QueryIterator';
import type { ConditionExpression, ConditionExpressionPredicate } from '@aws/dynamodb-expressions';
import type { ZeroArgumentsConstructor } from '@aws/dynamodb-data-marshaller';

const client = new DynamoDB();
const mapper = new DataMapper({ client });

export class AbstractModel {
  static async get<T>(item: T, options?: GetOptions): Promise<T> {
    return mapper.get<T>(Object.assign(new this(), item), options);
  }

  static scan<T>(options?: ScanOptions | ParallelScanWorkerOptions): ScanIterator<T> {
    return mapper.scan<T>(this as any, options);
  }

  static query<T>(keyCondition: ConditionExpression | {
    [propertyName: string]: ConditionExpressionPredicate | any;
  }, options?: QueryOptions): QueryIterator<T> {
    return mapper.query<T>(this as unknown as ZeroArgumentsConstructor<T>, keyCondition, options);
  }

  async put<T>(options?: PutOptions) {
    return mapper.put<T>(this as any, options);
  }
}
