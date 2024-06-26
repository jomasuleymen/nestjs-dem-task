import {
	IsEmail,
	IsNotEmpty,
	IsString,
	IsStrongPassword,
	MinLength,
} from "class-validator";

class CreateUserDto {
	@IsString()
	@IsNotEmpty()
	@MinLength(3)
	username: string;

	@IsEmail()
	email: string;

	@IsNotEmpty()
	@IsStrongPassword(
		{
			minLength: 6,
			minNumbers: 1,
			minUppercase: 1,
			minSymbols: 0,
			minLowercase: 1,
		},
		{
			message: "password is too weak",
		}
	)
	password: string;
}

export default CreateUserDto;
