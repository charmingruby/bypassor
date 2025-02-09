import { Module } from '@nestjs/common';
import { UsersResolver } from './http/graphql/resolvers/users.resolver';
import { UsersService } from './core/service/users.service';
import { PrismaModule } from '../../shared/database/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [UsersResolver, UsersService],
  exports: [UsersService],
})
export class UsersModule {}
