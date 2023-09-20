import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PhonebookService {
  constructor(private prisma: PrismaService) {}

  async create(createPhonebookDto: Prisma.PhonebookCreateInput) {
    try {
      return this.prisma.phonebook.create({
        data: createPhonebookDto,
      });
    } catch (error) {
      return error;
    }
  }

  async findAll() {
    try {
      return this.prisma.phonebook.findMany();
    } catch (error) {
      return error;
    }
  }

  async findOne(id: string) {
    try {
      return this.prisma.phonebook.findUnique({
        where: {
          phonebookId: id,
        },
      });
    } catch (error) {
      return error;
    }
  }

  async findManyByUserId(userId: string) {
    try {
      return this.prisma.phonebook.findMany({
        where: {
          userId: userId,
        },
      });
    } catch (error) {
      return error;
    }
  }

  async update(id: string, updatePhonebookDto: Prisma.PhonebookUpdateInput) {
    return this.prisma.phonebook.update({
      where: {
        phonebookId: id,
      },
      data: updatePhonebookDto,
    });
  }

  remove(id: string) {
    return this.prisma.phonebook.delete({
      where: {
        phonebookId: id,
      },
    });
  }
}
