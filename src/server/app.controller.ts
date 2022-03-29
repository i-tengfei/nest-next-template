import { Controller, Get } from '@nestjs/common'
import { Hello } from './app.model.hello'
import { AppService } from './app.service'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/hello')
  getHello(): Hello {
    return this.appService.getHello()
  }
}
