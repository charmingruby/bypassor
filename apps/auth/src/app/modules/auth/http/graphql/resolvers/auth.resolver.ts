import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { UserModel } from '../../../../users/http/graphql/models/user.model';
import { LoginInput } from '../dto/login.input';
import { GraphQlContext } from '@bypassor/nestjs';
import { AuthService } from '../../../core/services/auth.service';
import { TokenService } from '../../shared/tokens/token.service';
import { InvalidCredentialsException } from '../../../core/exceptions/invalid-credentials.exception';
import { UnauthorizedException } from '@nestjs/common';

@Resolver()
export class AuthResolver {
  constructor(
    private readonly authService: AuthService,
    private readonly tokenService: TokenService
  ) {}

  @Mutation(() => UserModel)
  async login(
    @Args('loginInput') input: LoginInput,
    @Context() ctx: GraphQlContext
  ) {
    try {
      const verifiedUser = await this.authService.login({ ...input });

      this.tokenService.generate({ userId: verifiedUser.id }, ctx.res);

      return verifiedUser;
    } catch (err) {
      if (err instanceof InvalidCredentialsException) {
        throw new UnauthorizedException(err.message);
      }
    }
  }
}
