import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import configuration from './config/configuration'

declare const module: any

async function bootstrap() {
  const app = await NestFactory.create(AppModule.initialize())
  //@ts-ignore
  global.__app = app
  await app.listen(configuration().port)

  if (module.hot) {
    module.hot.accept()
    module.hot.dispose(() => app.close())
  }
}

bootstrap()
