import { Module } from '@nestjs/common';
import { AuthResolver } from './http/graphql/resolvers/auth.resolver';
import { AuthService } from './core/services/auth.service';
import { PrismaModule } from '../../shared/database/prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    PrismaModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.getOrThrow('JWT_SECRET'),
        signOptions: { expiresIn: configService.getOrThrow('JWT_EXPIRES_MS') },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [AuthResolver, AuthService],
})
export class AuthModule {}
