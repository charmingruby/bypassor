import { Module } from '@nestjs/common';
import { AuthResolver } from './http/graphql/resolvers/auth.resolver';
import { AuthService } from './core/services/auth.service';
import { PrismaModule } from '../../shared/database/prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from '../users/users.module';
import { TokenService } from './http/shared/tokens/token.service';

@Module({
  imports: [
    PrismaModule,
    ConfigModule,
    UsersModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.getOrThrow('JWT_SECRET'),
        signOptions: { expiresIn: configService.getOrThrow('JWT_EXPIRES_MS') },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [AuthResolver, AuthService, TokenService],
})
export class AuthModule {}
