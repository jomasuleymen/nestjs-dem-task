import {
	ArgumentsHost,
	Catch,
	ExceptionFilter,
	HttpStatus,
} from "@nestjs/common";
import { Response } from "express";
import { ServiceException } from "src/exceptions/service.exception";

@Catch(ServiceException)
export class ServiceExceptionFilter implements ExceptionFilter {
	catch(exception: ServiceException, host: ArgumentsHost) {
		const ctx = host.switchToHttp();
		const response = ctx.getResponse() as Response;

		response.status(HttpStatus.BAD_REQUEST).json({
			statusCode: HttpStatus.BAD_REQUEST,
			message: exception.message,
		});
	}
}
