import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserModel } from '../models/user.model';
import { UsersService } from '../../../core/services/users.service';
import { CreateUserInput } from '../dtos/create-user.input';
import { FindUserByIdInput } from '../dtos/find-user-by-id.input';

@Resolver(() => UserModel)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation(() => UserModel, { name: 'createUser' })
  async createUser(@Args('createUserInput') input: CreateUserInput) {
    return this.usersService.createUser({
      ...input,
    });
  }

  @Query(() => UserModel, { name: 'findUser' })
  async getUsers(@Args('findUserByIdInput') input: FindUserByIdInput) {
    return this.usersService.findUserById(input.id);
  }
}
