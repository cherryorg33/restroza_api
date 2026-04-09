import { TypeOrmModuleOptions } from "@nestjs/typeorm";

console.log("DB USER:", process.env.DB_USERNAME);

export const databaseConfig: TypeOrmModuleOptions = {
  type: "mysql",
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT) || 3306,
  username: process.env.DB_USERNAME || "root",
  password: process.env.DB_PASSWORD || "root",
  database: process.env.DB_NAME || "restroza_dev",
  autoLoadEntities: true,
  synchronize: false,
};
