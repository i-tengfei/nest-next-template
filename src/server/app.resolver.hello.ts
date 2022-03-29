import { Query, Resolver } from '@nestjs/graphql'
import { Hello } from './app.model.hello'
import { AppService } from './app.service'

@Resolver(() => Hello)
export class HelloResolver {
  constructor(private service: AppService) {}

  @Query(() => Hello)
  async hello() {
    return this.service.getHello()
  }
}
