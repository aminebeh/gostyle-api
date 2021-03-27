import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { EntityNotFoundError } from 'typeorm';

/**
 * @author [gsusmonzon]{@link https://gist.github.com/gsusmonzon}
 * @source [code]{@link https://gist.github.com/gsusmonzon/ecd7842495f07594761e40c2758617d0}
 *
 * Custom exception filter to convert EntityNotFoundError from TypeOrm to NestJs responses
 * @see https://docs.nestjs.com/exception-filters
 *
 * @todo Use [interceptors]{@link https://docs.nestjs.com/interceptors} instead
 */
@Catch(EntityNotFoundError)
export class EntityNotFoundFilter implements ExceptionFilter {
  catch(exception: EntityNotFoundError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const status = HttpStatus.NOT_FOUND;
    response.status(status).json({
      statusCode: status,
      error: 'Not Found',
      message: exception.message,
    });
  }
}
