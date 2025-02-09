import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { UserModel } from '../../../../users/http/graphql/models/user.model';
import { LoginInput } from '../dtos/login.input';
import { GraphQlContext } from '@bypassor/nestjs';
import { AuthService } from '../../../core/services/auth.service';
import { TokenService } from '../../../security/tokens/token.service';
import { InvalidCredentialsException } from '../../../core/exceptions/invalid-credentials.exception';
import { UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Resolver()
export class AuthResolver {
  constructor(
    private readonly authService: AuthService,
    private readonly tokenService: TokenService,
    private readonly configService: ConfigService
  ) {}

  @Mutation(() => UserModel)
  async login(
    @Args('loginInput') input: LoginInput,
    @Context() ctx: GraphQlContext
  ) {
    try {
      const verifiedUser = await this.authService.login({ ...input });

      const { accessToken, expires } = this.tokenService.generate({
        userId: verifiedUser.id,
      });

      ctx.res.cookie('Authentication', accessToken, {
        httpOnly: true,
        secure: this.configService.get('NODE_ENV') === 'production',
        expires,
      });

      return verifiedUser;
    } catch (err) {
      if (err instanceof InvalidCredentialsException) {
        throw new UnauthorizedException(err.message);
      }
    }
  }
}
