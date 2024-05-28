import { CacheModule } from "@nestjs/cache-manager";
import { HttpStatus, INestApplication } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { configureApp } from "src/app.config";
import request from "supertest";
import { UserController } from "../user.controller";
import { UserService } from "../user.service";
import { createUserServiceModule } from "./user.service.spec";

describe("UserController", () => {
	let app: INestApplication;

	beforeEach(async () => {
		const serviceModule: TestingModule = await createUserServiceModule();

		const module: TestingModule = await Test.createTestingModule({
			imports: [CacheModule.register()],
			controllers: [UserController],
			providers: [UserService],
		})
			.overrideProvider(UserService)
			.useValue(serviceModule.get(UserService))
			.compile();

		app = module.createNestApplication();
		configureApp(app);
		await app.init();
	});

	it("should throw error if user not found", () => {
		request(app.getHttpServer())
			.get("/users/get-user-by-id?id=-1")
			.expect(HttpStatus.INTERNAL_SERVER_ERROR, (_, res) => {
				expect(res.body?.message).toBe("ERR_USER_NOT_FOUND");
			});
	});
});
