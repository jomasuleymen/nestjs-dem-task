// Генерировал через gen-env-types

declare global {
	namespace NodeJS {
		interface ProcessEnv {
			DOMAIN: string;
			SERVER_PORT: string;
			POSTGRES_DB: string;
			POSTGRES_USER: string;
			POSTGRES_PASSWORD: string;
			POSTGRES_PORT: string;
			POSTGRES_HOST: string;
			REDIS_HOST: string;
			REDIS_PORT: string;
			REDIS_PASSWORD: string;
		}
	}
}

export {};
