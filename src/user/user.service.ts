import { BadRequestException, Injectable } from "@nestjs/common";
import CreateUserDto from "./dto/create-user.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { Repository } from "typeorm";
import bcrypt from "bcrypt";

@Injectable()
export class UserService {
	constructor(
		@InjectRepository(User)
		private userRepo: Repository<User>
	) {}

	async create(dto: CreateUserDto) {
		const userByEmail = await this.userRepo.exists({
			where: {
				email: dto.email,
			},
		});

		if (userByEmail) throw new BadRequestException("email is already taken");

		const hashedPassword = bcrypt.hashSync(dto.password, 10);
		const data: Partial<User> = {
			username: dto.username,
			email: dto.email,
			password: hashedPassword,
		};

		return await this.userRepo.save(data);
	}

	async findOne(id: number) {
		const user = await this.userRepo.findOneBy({ id });
		return user;
	}
}
