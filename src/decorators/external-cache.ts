import { applyDecorators, SetMetadata, UseInterceptors } from "@nestjs/common";
import {
	ExternalCacheOptions,
	ExternalCacheInterceptor,
	METADATA_EXTERNAL_CACHE_KEY,
} from "src/interceptors/cache.interceptor";

export const ExternalCache = (cacheOptions: ExternalCacheOptions): MethodDecorator => {
	// if no provided cache keys, dont cache nothing
	if (!cacheOptions.queries?.length) {
		return applyDecorators();
	}

	return applyDecorators(
		SetMetadata(METADATA_EXTERNAL_CACHE_KEY, cacheOptions),
		UseInterceptors(ExternalCacheInterceptor)
	);
};
