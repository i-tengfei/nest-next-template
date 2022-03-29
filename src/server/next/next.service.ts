import { Inject, Injectable, Provider } from '@nestjs/common'
import next from 'next'
import { NextServer, NextServerOptions } from 'next/dist/server/next'
import { NEXT, NEXT_MODULE_OPTIONS } from './next.constants'

export const createNext = (): Provider => ({
  provide: NEXT,
  useFactory: async (options: NextServerOptions): Promise<NextServer> => {
    const server = next(options)
    await server.prepare()
    return server
  },
  inject: [NEXT_MODULE_OPTIONS],
})

@Injectable()
export class NextService {
  constructor(@Inject(NEXT) private readonly next: NextServer) {}

  getRequestHandler() {
    return this.next.getRequestHandler()
  }
}
