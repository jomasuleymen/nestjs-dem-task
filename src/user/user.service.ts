import { InjectQueue } from "@nestjs/bull";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import bcrypt from "bcrypt";
import { Queue } from "bull";
import ms from "ms";
import { Equal, Repository } from "typeorm";
import CreateUserDto from "./dto/create-user.dto";
import { User } from "./entities/user.entity";
import {
	UserEmailExistsException,
	UserNotFoundException,
} from "./user-exceptions";
import { USER_QUEUE, USER_TASK } from "./user-processor";

@Injectable()
export class UserService {
	constructor(
		@InjectRepository(User)
		private userRepo: Repository<User>,
		@InjectQueue(USER_QUEUE) private userQueue: Queue
	) {}

	async create(dto: CreateUserDto) {
		const userByEmail = await this.userRepo.exists({
			where: {
				email: Equal(dto.email),
			},
		});

		if (userByEmail) {
			// я думаю, что выдавать http ошибку в уровне сервиса не правильно,
			// поэтому исключении из сервиса обернул с помощью специальной ошибки (ServiceException)
			// чтобы опазнаться, что произошла ошибка в сервисе
			throw new UserEmailExistsException();
		}

		const hashedPassword = bcrypt.hashSync(dto.password, 10);
		const data: Partial<User> = {
			username: dto.username,
			email: dto.email,
			password: hashedPassword,
		};
		
		const user = await this.userRepo.save(data);
		this.userQueue.add(
			USER_TASK.ACTIVATE_USER,
			{ id: user.id },
			{ delay: ms("10s") }
		);

		return user;
	}

	async findById(id: number) {
		const user = await this.userRepo.findOneBy({ id: Equal(id) });
		if (!user) throw new UserNotFoundException();

		return user;
	}
}
