import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Patch,
  Param,
  Delete,
  Req,
} from '@nestjs/common';
import { WishesService } from './wishes.service';
import { CreateWishDto } from './dto/create-wish.dto';
import { UpdateWishDto } from './dto/update-wish.dto';
import type { TAdvancedRequest } from '../types';
import { AuthGuard } from '@nestjs/passport';

@Controller('wishes')
export class WishesController {
  constructor(private readonly wishesService: WishesService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  create(@Body() createWishDto: CreateWishDto, @Req() req) {
    return this.wishesService.create(createWishDto, req.user.id);
  }

  @Get('last')
  getLastWishes() {
    return this.wishesService.getLastWishes();
  }

  @Get('top')
  getTopWishes() {
    return this.wishesService.getTopWishes();
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  getOneWish(@Param('id') id: string) {
    return this.wishesService.getOneWish(+id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
  update(
    @Param('id') id: string,
    @Req() req: TAdvancedRequest,
    @Body() updateWishDto: UpdateWishDto,
  ) {
    return this.wishesService.update(+id, updateWishDto, req.user.id);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  remove(@Param('id') id: string, @Req() req: TAdvancedRequest) {
    return this.wishesService.remove(+id, req.user.id);
  }

  @Post(':id/copy')
  @UseGuards(AuthGuard('jwt'))
  copy(@Param('id') id: string, @Req() req: TAdvancedRequest) {
    return this.wishesService.copy(+id, req.user.id);
  }
}
