import { Cache, CACHE_MANAGER } from "@nestjs/cache-manager";
import {
	CallHandler,
	ExecutionContext,
	Inject,
	Injectable,
	NestInterceptor,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Request } from "express";
import { Observable, of, tap } from "rxjs";

export const METADATA_EXTERNAL_CACHE_KEY = "caches-key";

export type ExternalCacheOptions = {
	/**
	 * List of query keys that you want to be included in the cache key.
	 * They will be extracted from request query parameters.
	 */
	queries?: string[];
	ttl: number;
};


@Injectable()
export class ExternalCacheInterceptor implements NestInterceptor {
	constructor(
		@Inject(CACHE_MANAGER)
		private readonly cacheManager: Cache,
		private readonly reflector: Reflector
	) {}

	async intercept(
		context: ExecutionContext,
		next: CallHandler
	): Promise<Observable<any>> {
		const request: Request = context.switchToHttp().getRequest();
		const { path } = request;

		// Retrieve the cache options from the request handler
		const cacheOptions: ExternalCacheOptions =
			this.reflector.get<ExternalCacheOptions>(
				METADATA_EXTERNAL_CACHE_KEY,
				context.getHandler()
			);

		/**
		 * cacheOptions.queries = ["id", "key2"]
		 * path = "/users/get-user-by-id?id=123&key=value&key2=value2"
		 * queryKeys = "123:value2"
		 */
		const queryKeys = this.getQueriesKey(cacheOptions, request);
		if (!queryKeys) return next.handle();

		const cacheKey = path + ":" + queryKeys;

		const data = await this.cacheManager.get(cacheKey);
		if (data) return of(data);

		return next.handle().pipe(
			tap((data) => {
				this.cacheManager.set(cacheKey, data, cacheOptions.ttl);
			})
		);
	}

	private getQueriesKey(
		cacheOptions: ExternalCacheOptions,
		request: Request
	): string | undefined {
		const { queries: cacheQueries } = cacheOptions;
		const { query: requestQueries } = request;

		// if not enogh queries are provided, dont check the cache
		if (
			!cacheQueries ||
			Object.keys(requestQueries).length < cacheQueries.length
		)
			return;

		const foundQueries = cacheQueries
			.filter((query) => requestQueries.hasOwnProperty(query))
			.map((cacheQuery) => requestQueries[cacheQuery]);

		if (foundQueries.length !== cacheQueries.length) return;

		return foundQueries.join(":");
	}
}
