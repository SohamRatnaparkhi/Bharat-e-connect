import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma, User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { UserLoginInput } from './types/auth.types';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: Prisma.UserCreateInput): Promise<User> {
    try {
      const password = createUserDto.password;
      const hashedPassword = await bcrypt.hash(password, 10);
      createUserDto.password = hashedPassword;
      const checkUser = await this.prisma.user.findUnique({
        where: {
          ethAddress: createUserDto.ethAddress,
        },
      });
      if (checkUser) {
        return checkUser;
      }
      return this.prisma.user.create({
        data: createUserDto,
      });
    } catch (error) {
      return error;
    }
  }

  async findAll(): Promise<User[]> {
    try {
      return this.prisma.user.findMany();
    } catch (error) {
      return error;
    }
  }

  async findOne(id: string): Promise<User> {
    try {
      return this.prisma.user.findUnique({
        where: {
          userId: id,
        },
      });
    } catch (error) {
      return error;
    }
  }

  async findOneByEthAddress(ethAddress: string): Promise<User> {
    try {
      return this.prisma.user.findUnique({
        where: {
          ethAddress: ethAddress,
        },
      });
    } catch (error) {
      return error;
    }
  }

  async updateById(id: string, updateUserDto: Prisma.UserUpdateInput) {
    try {
      return this.prisma.user.update({
        where: {
          userId: id,
        },
        data: updateUserDto,
      });
    } catch (error) {
      return error;
    }
  }

  async updateByEthAddress(
    ethAddress: string,
    updateUserDto: Prisma.UserUpdateInput,
  ) {
    try {
      return this.prisma.user.update({
        where: {
          ethAddress: ethAddress,
        },
        data: updateUserDto,
      });
    } catch (error) {
      return error;
    }
  }

  async remove(id: string) {
    return this.prisma.user.delete({
      where: {
        userId: id,
      },
    });
  }

  async login(loginUserDto: UserLoginInput) {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          ethAddress: loginUserDto.ethAddress,
        },
      });
      const check = await bcrypt.compare(loginUserDto.password, user?.password);
      if (user && check) {
        return user;
      } else {
        return null;
      }
    } catch (error) {
      return error;
    }
  }
}
