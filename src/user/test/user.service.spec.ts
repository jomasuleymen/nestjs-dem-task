import { getQueueToken } from "@nestjs/bull";
import { Test } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import CreateUserDto from "../dto/create-user.dto";
import { User } from "../entities/user.entity";
import { USER_QUEUE, UserProcessor } from "../user-processor";
import { UserService } from "../user.service";

export const createUserServiceModule = async (db: Record<string, any> = {}) => {
	db.users = [];

	return await Test.createTestingModule({
		providers: [
			{
				provide: getRepositoryToken(User),
				useValue: {
					exists: jest.fn().mockImplementation(async (user) => {
						return db.users.some((u: User) => u.id === user.id);
					}),
					save: jest.fn().mockImplementation(async (user) => {
						db.users.push(user);
						return user;
					}),
					findOneBy: jest.fn().mockImplementation(async (user) => {
						return db.users.find((u: User) => u.id === user.id);
					}),
				},
			},
			{
				provide: getQueueToken(USER_QUEUE),
				useValue: {
					add: jest.fn(),
				},
			},
			UserService,
			UserProcessor,
		],
		exports: [UserService],
	}).compile();
};

describe("UserService", () => {
	let service: UserService;

	beforeEach(async () => {
		const module = await createUserServiceModule();
		service = module.get<UserService>(UserService);
	});

	it("should not allow create user with duplicate email", async () => {
		const user: CreateUserDto = {
			username: "john",
			email: "john@email.com",
			password: "Password123",
		};

		await service.create(user);
		user.username = "jane";

		await expect(service.create(user)).rejects.toThrow("ERR_USER_EMAIL_EXISTS");
	});
});
