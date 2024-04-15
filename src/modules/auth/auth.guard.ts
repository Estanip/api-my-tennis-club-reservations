import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { CONFIG } from 'src/shared/Config/configuration';

@Injectable()
export class AuthGuard implements CanActivate {
  private readonly secret: string;
  constructor(
    private readonly jwtService: JwtService,
    private readonly reflector: Reflector,
  ) {
    this.secret = CONFIG.jwt.secret;
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(CONFIG.is_public, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) return true;
    const request = context.switchToHttp().getRequest();
    const token = this._extractTokenFromHeader(request);
    if (!token) throw new UnauthorizedException('Invalid or expired token');
    try {
      await this._refreshTokenIfExpired(token);
      const payload = await this.jwtService.verifyAsync(token, {
        secret: this.secret,
      });
      request['user'] = payload;
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }

  private _extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }

  private async _refreshTokenIfExpired(token: string) {
    try {
      const { exp, user_id } = this.jwtService.verify(token, { ignoreExpiration: true });
      const currentTime = Math.floor(Date.now() / 1000);

      // Refresh token if it's about to expire within 5 minutes
      if (exp - currentTime < 300)
        return await this.jwtService.signAsync({ user_id }, { expiresIn: CONFIG.jwt.expires });

      return token;
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}
