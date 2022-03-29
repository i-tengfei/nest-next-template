import { Injectable } from '@nestjs/common'
import { plainToClass } from 'class-transformer'
import { Hello } from './app.model.hello'

@Injectable()
export class AppService {
  getHello(): Hello {
    return plainToClass(Hello, { Hello: 'World' })
  }
}
