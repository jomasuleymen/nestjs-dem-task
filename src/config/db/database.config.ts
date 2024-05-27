import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import dotenv from "dotenv";
import path from "path";
import { DataSourceOptions } from "typeorm";
import { rootPath } from "../constants";

dotenv.config();

const isProd = process.env.NODE_ENV === "production";

export const dataSourceOptions: DataSourceOptions = {
	type: "postgres",
	host: process.env.DATABASE_HOST,
	port: Number(process.env.DATABASE_PORT),
	username: process.env.DATABASE_USER,
	password: process.env.DATABASE_PASSWORD,
	database: process.env.DATABASE_DB,
	synchronize: !isProd,
	entities: [path.join(rootPath, "**/*.entity{.ts,.js}")],
	migrations: [path.join(rootPath, "migrations/*{.ts,.js}")],
};

export const getTypeOrmOptions = (): TypeOrmModuleOptions => {
	return {
		...dataSourceOptions,
	};
};
