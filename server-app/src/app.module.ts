import { Module, NestModule, MiddlewareConsumer, Logger } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerMiddleware } from './middlewares/logger.middleware';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { FileModule } from './file/file.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    UsersModule,
    AuthModule,
    MongooseModule.forRoot(process.env.MONGO_URI),
    FileModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  private readonly logger = new Logger(AppModule.name);

  constructor() {
    mongoose.connection.on('connected', () => {
      this.logger.log('База данных успешно подключена!');
    });

    mongoose.connection.on('error', (err) => {
      this.logger.error(`Ошибка подключения к базе данных: ${err.message}`);
    });
  }

  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware) // Применяем LoggerMiddleware
      .forRoutes('*');
  }
}
