import { ServiceException } from "src/exceptions/service.exception";

export class UserEmailExistsException extends ServiceException {
	constructor() {
		super("ERR_USER_EMAIL_EXISTS");
	}
}

export class UserNotFoundException extends ServiceException {
	constructor() {
		super("ERR_USER_NOT_FOUND");
	}
}
