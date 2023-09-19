import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma, User } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: Prisma.UserCreateInput): Promise<User> {
    try {
      const password = createUserDto.password;
      const hashedPassword = await bcrypt.hash(password, 10);
      createUserDto.password = hashedPassword;
      return this.prisma.user.create({
        data: createUserDto,
      });
    } catch (error) {
      return error;
    }
  }

  async findAll(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  async findOne(id: string): Promise<User> {
    return this.prisma.user.findUnique({
      where: {
        userId: id,
      },
    });
  }

  async findOneByEthAddress(ethAddress: string): Promise<User> {
    return this.prisma.user.findUnique({
      where: {
        ethAddress: ethAddress,
      },
    });
  }

  async updateById(id: string, updateUserDto: Prisma.UserUpdateInput) {
    return this.prisma.user.update({
      where: {
        userId: id,
      },
      data: updateUserDto,
    });
  }

  async updateByEthAddress(
    ethAddress: string,
    updateUserDto: Prisma.UserUpdateInput,
  ) {
    return this.prisma.user.update({
      where: {
        ethAddress: ethAddress,
      },
      data: updateUserDto,
    });
  }

  async remove(id: string) {
    return this.prisma.user.delete({
      where: {
        userId: id,
      },
    });
  }
}
