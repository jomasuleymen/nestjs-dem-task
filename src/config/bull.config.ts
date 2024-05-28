import { BullRootModuleOptions } from "@nestjs/bull";
import { ConfigService } from "@nestjs/config";
import { getRedisConfig } from "./cache.config";

export const getBullOptions = (
	config: ConfigService
): BullRootModuleOptions => {
	const redisConfig = getRedisConfig(config);

	return {
		prefix: "bull",
		redis: {
			host: redisConfig.host,
			port: redisConfig.port,
			password: redisConfig.password,
		},
		defaultJobOptions: {
			removeOnComplete: true,
		},
	};
};
