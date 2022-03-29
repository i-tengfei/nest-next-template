import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { DynamicModule, Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { GraphQLModule } from '@nestjs/graphql'
import { AppController } from './app.controller'
import { HelloResolver } from './app.resolver.hello'
import { AppService } from './app.service'
import configuration from './config/configuration'
import { NextModule } from './next/next.module'

declare const module: any

const configModule = ConfigModule.forRoot({
  load: [configuration],
  isGlobal: true,
})

const graphQLModule = GraphQLModule.forRootAsync<ApolloDriverConfig>({
  driver: ApolloDriver,
  imports: [ConfigModule],
  useFactory: async (configService: ConfigService) => ({
    debug: !configService.get<boolean>('prod', false),
    playground: true,
    autoSchemaFile: 'schema.gql',
    sortSchema: true,
  }),
  inject: [ConfigService],
})

@Module({})
export class AppModule {
  public static initialize(): DynamicModule {
    const nextModule =
      module.hot?.data?.nextModule ??
      NextModule.forRootAsync({
        dev: !configuration().prod,
      })

    if (module.hot) {
      module.hot.dispose((data: any) => {
        data.nextModule = nextModule
      })
    }

    return {
      module: AppModule,
      imports: [configModule, graphQLModule, nextModule],
      controllers: [AppController],
      providers: [AppService, HelloResolver],
    }
  }
}
