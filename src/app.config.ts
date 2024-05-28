import { INestApplication, ValidationPipe } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { ServiceExceptionFilter } from "./filters/service-exception.filter";

export const configureApp = (app: INestApplication<any>) => {
	app.useGlobalPipes(
		new ValidationPipe({
			whitelist: true,
			transform: true,
		})
	);

	app.useGlobalFilters(new ServiceExceptionFilter());
};

export const startApp = async (app: INestApplication<any>) => {
	configureApp(app);
	const configService = app.get<ConfigService>(ConfigService);

	const PORT = configService.get<number>("SERVER_PORT", 3000);
	await app.listen(PORT);
};
