import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.services';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UseGuards, Controller, Post, Body, Req } from '@nestjs/common';
import type { TSigninResponse, TAdvancedRequest } from '../types';
import { AuthGuard } from '@nestjs/passport';

@Controller()
export class AuthController {
  constructor(
    private userService: UsersService,
    private authService: AuthService,
  ) {}

  @UseGuards(AuthGuard('local'))
  @Post('signin')
  async signin(@Req() req: TAdvancedRequest): Promise<TSigninResponse> {
    return this.authService.signin(req.user);
  }
  @Post('signup')
  signup(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }
}
