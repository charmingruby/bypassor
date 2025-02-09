import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../shared/database/prisma/prisma.service';
import { UsersService } from '../../../users/core/services/users.service';
import { compare } from 'bcryptjs';
import { InvalidCredentialsException } from '../exceptions/invalid-credentials.exception';

interface LoginParams {
  email: string;
  password: string;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly usersService: UsersService
  ) {}

  async login(params: LoginParams) {
    try {
      return await this.verifyUser(params.email, params.password);
    } catch {
      throw new InvalidCredentialsException();
    }
  }

  private async verifyUser(email: string, password: string) {
    const user = await this.usersService.findUserByEmail(email);
    const authenticated = await compare(password, user.password);
    if (!authenticated) {
      throw new InvalidCredentialsException();
    }

    return user;
  }
}
