import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Users } from './users/user.entity';
import { UsersModule } from './users/users.module';
import { UsersService } from './users/users.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forFeature([Users]), ConfigModule.forRoot(), TypeOrmModule.forRoot({
        type: 'mysql',
        host: process.env.MYSQL_ADDON_HOST,
        port: 3306,
        username: process.env.MYSQL_ADDON_USER,
        password: process.env.MYSQL_ADDON_PASSWORD,
        database: process.env.MYSQL_ADDON_DB,
        entities: [__dirname + '/../**/*.entity.js'],
        logging: true,
        migrations: ["dist/migrations/*{.ts,.js}"],
        migrationsTableName: "migrations_typeorm",
        migrationsRun: true
      }), UsersModule],
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });
  });
});
