import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import type { TSigninResponse } from '../types/response';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validatePassword(
    username: string,
    password: string,
  ): Promise<User> | null {
    const user = await this.usersService.getUserByUsername(username);
    if (user) {
      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          return null;
        }
        delete user.password;
        return user;
      });
    }
    return null;
  }

  async signin(user: User): Promise<TSigninResponse> {
    const payload = { sub: user.id };

    return {
      access_token: this.jwtService.sign(payload, { expiresIn: '7d' }),
    };
  }
}
