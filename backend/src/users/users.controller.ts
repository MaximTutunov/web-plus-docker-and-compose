import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
@UseGuards(AuthGuard('jwt'))
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  getCurrentUser(@Req() req) {
    console.log('USERS CONTROLLER GET me called');
    console.log(
      'USERS CONTROLLER GET me called, this.usersService.getCurrentUser(req.user.id)',
      this.usersService.getCurrentUser(req.user.id),
    );
    return this.usersService.getCurrentUser(req.user.id);
  }

  @Patch('me')
  updateUser(@Body() updateUserDto: UpdateUserDto, @Req() req) {
    console.log('USERS CONTROLLER PATCH me called');
    return this.usersService.updateUser(updateUserDto, req.user.id);
  }

  @Get('me/wishes')
  getCurrentUserWishes(@Req() req) {
    console.log('USERS CONTROLLER GET me/wishes called');
    return this.usersService.getCurrentUserWishes(req.user.id);
  }

  @Get(':username')
  getUserByUsername(@Param('username') username: string) {
    console.log('USERS CONTROLLER GET :username called');
    return this.usersService.getUserByUsername(username);
  }

  @Get(':username/wishes')
  getWishesByUsername(@Param('username') username: string) {
    console.log('USERS CONTROLLER GET :username/wishes called');
    return this.usersService.getWishesByUsername(username);
  }

  @Post('find')
  findManyUsers(@Body('query') query: string) {
    console.log('USERS CONTROLLER POST find called');
    return this.usersService.findManyUsers(query);
  }
}
