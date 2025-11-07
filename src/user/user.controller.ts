import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from './guard/auth.guard';
import { Roles } from './decorator/roles.decorator';

@Controller('api/v1/user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get('me')
  @UseGuards(AuthGuard)
  @Roles(['admin', 'user'])
  getMe(@Req() req) {
    return this.userService.getMe(req.user);
  }

  @Patch('me')
  @UseGuards(AuthGuard)
  @Roles(['admin', 'user'])
  updateMe(@Req() req, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.updateMe(req.user, updateUserDto);
  }

  @Delete('me')
  @UseGuards(AuthGuard)
  @Roles(['user'])
  removeMe(@Req() req) {
    return this.userService.removeMe(req.user);
  }

  @Post()
  @Roles(['admin'])
  @UseGuards(AuthGuard)
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  @Roles(['admin'])
  @UseGuards(AuthGuard)
  findAll(@Query() query: any) {
    return this.userService.findAll(query);
  }

  @Get(':id')
  @Roles(['admin'])
  @UseGuards(AuthGuard)
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  @Roles(['admin'])
  @UseGuards(AuthGuard)
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  @Roles(['admin'])
  @UseGuards(AuthGuard)
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }


}
