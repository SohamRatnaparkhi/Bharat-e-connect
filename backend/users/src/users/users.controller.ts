import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { Prisma, User } from '@prisma/client';
import { basePath } from 'constants/Url';
import { UserLoginInput } from './types/auth.types';

@Controller(basePath + 'users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: Prisma.UserCreateInput): Promise<User> {
    return this.usersService.create(createUserDto);
  }

  @Get()
  async findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Get('/ethAddress/:ethAddress')
  async findOneByEthAddress(@Param('ethAddress') ethAddress: string) {
    return this.usersService.findOneByEthAddress(ethAddress);
  }

  @Patch(':id')
  async updateById(
    @Param('id') id: string,
    @Body() updateUserDto: Prisma.UserUpdateInput,
  ) {
    return this.usersService.updateById(id, updateUserDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }

  @Post('/login')
  async login(@Body() loginUserDto: UserLoginInput) {
    return this.usersService.login(loginUserDto);
  }
}
