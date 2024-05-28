import {
	Body,
	Controller,
	Get,
	HttpCode,
	HttpStatus,
	ParseIntPipe,
	Post,
	Query,
	UseInterceptors,
} from "@nestjs/common";
import ms from "ms";
import { ExternalCache } from "src/decorators/external-cache";
import { ResponseInterceptor } from "src/interceptors/response.interceptor";
import CreateUserDto from "./dto/create-user.dto";
import { UserService } from "./user.service";

// validation pipe registered as globally, look: app.config.ts
@Controller("users")
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Post()
	@HttpCode(HttpStatus.CREATED)
	async create(@Body() createUserDto: CreateUserDto) {
		await this.userService.create(createUserDto);
		return {
			message: "User created successfully",
		};
	}

	@Get("/get-user-by-id")
	@ExternalCache({ queries: ["id"], ttl: ms("30m") })
	@UseInterceptors(ResponseInterceptor)
	async findOne(@Query("id", ParseIntPipe) id: string) {
		const user = await this.userService.findById(+id);
		return { user };
	}
}
