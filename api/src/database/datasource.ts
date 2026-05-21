import "dotenv/config";

import { ConfigService } from "@nestjs/config";
import { DataSource, DataSourceOptions } from "typeorm";

const configService = new ConfigService();

export const dataSourceOptions: DataSourceOptions = {
  type: "postgres",
  host: configService.getOrThrow<string>("DB_HOST"),
  port: configService.getOrThrow<number>("DB_PORT"),
  database: configService.getOrThrow<string>("DB_NAME"),
  username: configService.getOrThrow<string>("DB_USERNAME"),
  password: configService.getOrThrow<string>("DB_PASSWORD"),
  entities: [__dirname + "/../**/*.entity.{ts,js}"],
  migrations: [__dirname + "/migrations/*.{ts,js}"]
};

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;
