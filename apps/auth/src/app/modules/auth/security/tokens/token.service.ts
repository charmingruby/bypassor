import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

export interface TokenPayload {
  userId: number;
}

interface TokenGenerationResult {
  accessToken: string;
  expires: Date;
}

@Injectable()
export class TokenService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService
  ) {}

  generate(payload: TokenPayload): TokenGenerationResult {
    const expires = new Date();
    expires.setMilliseconds(
      expires.getTime() +
        parseInt(this.configService.getOrThrow('JWT_EXPIRES_MS'))
    );

    const accessToken = this.jwtService.sign(payload);

    return {
      accessToken,
      expires,
    };
  }
}
