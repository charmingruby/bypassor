import { Query, Resolver } from '@nestjs/graphql';
import { UserModel } from '../../../../users/http/graphql/models/user.model';

@Resolver()
export class AuthResolver {
  @Query(() => UserModel)
  async hello() {
    return 'Hello World!';
  }
}
