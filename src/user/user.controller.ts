import { Body, Controller, Get, Post, Query } from "@nestjs/common";
import CreateUserDto from "./dto/create-user.dto";
import { UserService } from "./user.service";


@Controller("users")
export class UserController {
	constructor(private readonly userService: UserService) {}
	
	@Post()
	// validation pipe registered as globally, look: app.config.ts
	async create(@Body() createUserDto: CreateUserDto) {
		return await this.userService.create(createUserDto);
	}

	@Get("/get-user-by-id")
	async findOne(@Query("id") id: string) {
		return await this.userService.findOne(+id);
	}
}
