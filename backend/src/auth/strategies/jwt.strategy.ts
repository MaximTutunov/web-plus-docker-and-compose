import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { UsersService } from '../../users/users.service';
import { User } from '../../users/entities/user.entity';

const { JWT_SECRET } = process.env;

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: JWT_SECRET,
    });
  }

  async validate(jwtPayLoad: { sub: number }): Promise<User> {
    const user = await this.usersService.findOne(jwtPayLoad.sub);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
