import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../shared/database/prisma/prisma.service';
import { hash } from 'bcryptjs';

interface CreateUserParams {
  email: string;
  password: string;
}

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  async createUser(data: CreateUserParams) {
    const { email, password } = data;

    const passwordHash = await hash(password, 10);

    return this.prismaService.user.create({
      data: { email, password: passwordHash },
    });
  }

  async findUserById(id: number) {
    return this.prismaService.user.findUniqueOrThrow({ where: { id } });
  }

  async findUserByEmail(email: string) {
    return this.prismaService.user.findUniqueOrThrow({ where: { email } });
  }
}
