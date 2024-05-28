import { BullModule } from "@nestjs/bull";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { UserController } from "./user.controller";
import { USER_QUEUE, UserProcessor } from "./user-processor";
import { UserService } from "./user.service";

@Module({
	imports: [
		TypeOrmModule.forFeature([User]),
		BullModule.registerQueue({
			name: USER_QUEUE,
		}),
	],
	controllers: [UserController],
	providers: [UserService, UserProcessor],
})
export class UserModule {}
