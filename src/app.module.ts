import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import * as process from 'node:process';
import { ConfigModule } from '@nestjs/config';


@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: process.env.MONGO_URL,
      database: 'nest-mongo',
      entities: [UserEntity],
      synchronize: true,
    }),
    
    UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
