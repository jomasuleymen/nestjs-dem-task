import { CacheModule } from "@nestjs/cache-manager";
import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { getRedisClientOptions } from "./config/cache.config";
import { getTypeOrmOptions } from "./config/db/database.config";
import { UserModule } from "./user/user.module";

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
		}),
		TypeOrmModule.forRootAsync({
			useFactory: getTypeOrmOptions,
		}),
		CacheModule.registerAsync({
			isGlobal: true,
			inject: [ConfigService],
			useFactory: getRedisClientOptions,
		}),
		UserModule,
	],
	controllers: [],
	providers: [],
})
export class AppModule {}
