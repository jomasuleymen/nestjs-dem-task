import { ServiceException } from "src/filters/service-exception.filter";

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
