import { Injectable } from '@nestjs/common';
import * as mongoose from 'mongoose';
import { connect, Schema, disconnect, Connection, Model } from 'mongoose';
import { AbstractDatabaseModule } from './abstract-database.module';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MongooseDatabaseModule extends AbstractDatabaseModule {
  constructor(private readonly configService: ConfigService) {
    super();
  }
  private connection: Connection;

  async connect(): Promise<void> {
    await connect(this.configService.get<string>('MONGO_URI'));
    console.log('Connected to MongoDB');
  }

  async disconnect(): Promise<void> {
    await disconnect();
    console.log('Disconnected from MongoDB');
  }

  async insertOne(table: string, data: any): Promise<void> {
    const model = this.getModel(table);
    const document = new model(data);
    await document.save();
  }

  async findOne<T>(table: string, query: any): Promise<T> {
    const model = this.getModel(table);
    return (await model.findOne(query).exec()) as T;
  }

  private getModel(table: string): Model<any> {
    const schema = new Schema({}, { strict: false });
    return mongoose.model(table, schema);
  }
}
