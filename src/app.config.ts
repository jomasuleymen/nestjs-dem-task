import { INestApplication, ValidationPipe } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import ValidationException from "./exceptions/validation.exception";

export const startApp = async (app: INestApplication<any>) => {
	const configService = app.get<ConfigService>(ConfigService);

	app.useGlobalPipes(
		new ValidationPipe({
			exceptionFactory: (errors) => new ValidationException(errors),
			stopAtFirstError: false,
			whitelist: true,
			transform: true,
		})
	);

	const PORT = configService.get<number>("SERVER_PORT", 3000);
	await app.listen(PORT);
};
