import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forFeature([Users]), TypeOrmModule.forRoot({
        type: 'mysql',
        host: "bvisxotfmszosn91q8f4-mysql.services.clever-cloud.com",
        port: 3306,
        username: "uuqvtz5wxpwqlxpb",
        password: "aDtLX4BxWZuhkEo0vHmK",
        database: "bvisxotfmszosn91q8f4",
        entities: [__dirname + '/../**/*.entity.js'],
        logging: true,
        migrations: ["dist/migrations/*{.ts,.js}"],
        migrationsTableName: "migrations_typeorm",
        migrationsRun: true
      })],
      providers: [UsersService],
      controllers: [UsersController],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
