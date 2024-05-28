import { Process, Processor } from "@nestjs/bull";
import { InjectRepository } from "@nestjs/typeorm";
import { Job } from "bull";
import { Equal, Repository } from "typeorm";
import { User } from "./entities/user.entity";

export const USER_QUEUE = "user";
export enum USER_TASK {
	ACTIVATE_USER = "activate",
}

@Processor(USER_QUEUE)
export class UserProcessor {
	constructor(
		@InjectRepository(User)
		private userRepo: Repository<User>
	) {}

	@Process(USER_TASK.ACTIVATE_USER)
	async task(job: Job<Pick<User, "id">>) {
		const user = await this.userRepo.findOneBy({ id: Equal(job.data.id) });
		if (user) {
			user.status = true;
			await this.userRepo.save(user);
		}
	}
}
