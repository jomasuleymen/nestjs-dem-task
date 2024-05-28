import { CacheOptions } from "@nestjs/cache-manager";
import { ConfigService } from "@nestjs/config";
import { redisStore } from "cache-manager-redis-yet";
import type { RedisClientOptions } from "redis";

export const getRedisConfig = (config: ConfigService) => ({
	host: config.get<string>("REDIS_HOST", "localhost"),
	port: config.get<number>("REDIS_PORT", 6379),
	password: config.get<string>("REDIS_PASSWORD"),
});

export const getRedisClientOptions = (
	config: ConfigService
): CacheOptions<RedisClientOptions> => {
	const redisConfig = getRedisConfig(config);
	const { host, port, password } = redisConfig;

	return {
		store: redisStore,
		url: `redis://${host}:${port}`,
		password,
	};
};
