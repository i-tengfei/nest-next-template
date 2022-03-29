import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common'
import { IncomingMessage, ServerResponse } from 'http'
import { NextService } from './next.service'

@Catch()
export class NextFilter implements ExceptionFilter {
  constructor(private readonly service: NextService) {}

  public async catch(err: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const request = ctx.getRequest()
    const response = ctx.getResponse()

    if (response && request) {
      const requestHandler = this.service.getRequestHandler()

      const isFastify = !!response.res

      const res: ServerResponse = isFastify ? response.res : response
      const req: IncomingMessage = isFastify ? request.raw : request

      if (!res.headersSent && req.url) {
        if (isFastify) {
          response.sent = true
        }
        return requestHandler(req, res)
      }
      return
    }

    // if the request and/or response are undefined (as with GraphQL) rethrow the error
    throw err
  }
}
