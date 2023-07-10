import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { TUserResponse } from 'src/types';

import { AuthService } from '../auth.services';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }
  async validate(username: string, password: string): Promise<TUserResponse> {
    const user = await this.authService.validatePassword(username, password);
    if (!user) {
      throw new UnauthorizedException({ message: 'Неверный логин или пароль' });
    }
    return user;
  }
}
