export abstract class AbstractDatabaseModule {
  abstract connect(): Promise<void>;
  abstract disconnect(): Promise<void>;
  abstract insertOne(table: string, data: any): Promise<void>;
  abstract findOne<T>(table: string, query: any): Promise<T>;
}
