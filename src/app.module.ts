import { BullModule } from "@nestjs/bull";
import { CacheModule } from "@nestjs/cache-manager";
import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { getBullOptions } from "./config/bull.config";
import { getRedisClientOptions } from "./config/cache.config";
import { getTypeOrmOptions } from "./config/db/database.config";
import { UserModule } from "./user/user.module";
import { isProd } from "./config/constants";
import path from "path";

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			envFilePath: path.resolve(isProd ? ".env" : ".env.development"),
		}),
		TypeOrmModule.forRootAsync({
			useFactory: getTypeOrmOptions,
		}),
		CacheModule.registerAsync({
			isGlobal: true,
			inject: [ConfigService],
			useFactory: getRedisClientOptions,
		}),
		BullModule.forRootAsync({
			inject: [ConfigService],
			useFactory: getBullOptions,
		}),
		UserModule,
	],
	controllers: [],
	providers: [],
})
export class AppModule {}
