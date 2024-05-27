import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { startApp } from "./app.config";

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	await startApp(app);
}

bootstrap();
