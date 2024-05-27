import { CacheOptions } from "@nestjs/cache-manager";
import { ConfigService } from "@nestjs/config";
import { redisStore } from "cache-manager-redis-yet";
import type { RedisClientOptions } from "redis";

export const getRedisClientOptions = (
	config: ConfigService
): CacheOptions<RedisClientOptions> => {
	return {
		store: redisStore,
		url: getRedisUrl(config),
		password: config.get("REDIS_PASSWORD"),
	};
};

const getRedisUrl = (config: ConfigService) => {
	if (config.get("REDIS_URL")) {
		return config.get<string>("REDIS_URL");
	}
	const host = config.get<string>("REDIS_HOST", "localhost");
	const port = config.get<number>("REDIS_PORT", 6379);
	return `redis://${host}:${port}`;
};
