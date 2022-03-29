import { DynamicModule, Module } from '@nestjs/common'
import { ApplicationConfig } from '@nestjs/core'
import { NextServerOptions } from 'next/dist/server/next'
import { NEXT_MODULE_OPTIONS } from './next.constants'
import { NextFilter } from './next.filter'
import { createNext, NextService } from './next.service'

@Module({
  providers: [NextService],
})
export class NextModule {
  public static async forRootAsync(
    options: Partial<NextServerOptions> = {},
  ): Promise<DynamicModule> {
    return {
      exports: [NextService],
      module: NextModule,
      providers: [
        createNext(),
        { provide: NEXT_MODULE_OPTIONS, useValue: options },
        {
          inject: [ApplicationConfig, NextService],
          provide: NextFilter,
          useFactory: (nestConfig: ApplicationConfig, service: NextService) => {
            const filter = new NextFilter(service)
            nestConfig.addGlobalFilter(filter)

            return filter
          },
        },
      ],
    }
  }

  constructor(
    private readonly applicationConfig: ApplicationConfig,
    private readonly service: NextService,
  ) {}
}
