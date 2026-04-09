import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigService } from "@nestjs/config";
import { Roles } from "src/modules/entities/Roles";
import { Userroles } from "src/modules/entities/Userroles";

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: "mysql",
        host: config.get("DB_HOST"),
        port: Number(config.get("DB_PORT")),
        username: config.get("DB_USERNAME"),
        password: config.get("DB_PASSWORD"),
        database: config.get("DB_NAME"),
        autoLoadEntities: true,
        entities: [__dirname + "/../modules/entities/*.js"],
        synchronize: false,
      }),
    }),
  ],
})
export class DatabaseModule {}
