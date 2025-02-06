import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserModel } from '../models/user.model';
import { UsersService } from '../../../core/service/users.service';
import { CreateUserInput } from '../dto/create-user.input';
import { FindUserByIdInput } from '../dto/find-user-by-id.input';

@Resolver(() => UserModel)
export class UsersResolver {
    constructor(private readonly usersService: UsersService) { }

    @Mutation(() => UserModel, { name: 'createUser' })
    async createUser(
        @Args('createUserInput') input: CreateUserInput
    ) {
        return this.usersService.createUser({
            ...input,
        });
    }

    @Query(() => UserModel, { name: 'findUser' })
    async getUsers(
        @Args('findUserByIdInput') input: FindUserByIdInput
    ) {

        return this.usersService.findUserById(input.id)
    }
}
