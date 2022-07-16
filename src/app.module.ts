import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthenticationMiddleWare } from './users/middleware/auth.middleware';
import { Users } from './users/user.entity';
import { UsersModule } from './users/users.module';
import { UsersService } from './users/users.service';

@Module({
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
  providers: [AppService, UsersService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthenticationMiddleWare).forRoutes({
      path: "/users/*", method: RequestMethod.GET,
    }),
      consumer.apply(AuthenticationMiddleWare).forRoutes({
        path: "/users/*", method: RequestMethod.PUT,
      })
  }
}
