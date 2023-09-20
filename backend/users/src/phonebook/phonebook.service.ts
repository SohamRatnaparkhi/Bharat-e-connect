import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PhonebookService {
  constructor(private prisma: PrismaService) {}

  async create(createPhonebookDto: Prisma.PhonebookCreateInput) {
    return this.prisma.phonebook.create({
      data: createPhonebookDto,
    });
  }

  async findAll() {
    return this.prisma.phonebook.findMany();
  }

  async findOne(id: string) {
    return this.prisma.phonebook.findUnique({
      where: {
        phonebookId: id,
      },
    });
  }

  async findManyByUserId(userId: string) {
    return this.prisma.phonebook.findMany({
      where: {
        userId: userId,
      },
    });
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
