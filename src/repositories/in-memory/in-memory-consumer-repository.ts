import { Consumer, Prisma } from '@prisma/client';
import { IConsumerRepository } from '@repositories/consumer-repository';
import { randomUUID } from 'node:crypto';

export class InMemoryConsumerRepository implements IConsumerRepository {
  public items: Consumer[] = [];

  async create(data: Prisma.ConsumerUncheckedCreateInput) {
    const consumer = {
      id: randomUUID() as string,
      userId: data.userId,
      fullName: data.fullName,
      contact: data.contact,
      address: data.address,
      status: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.items.push(consumer);

    return consumer;
  }

  async findAll() {
    return this.items;
  }

  async findByUserId(userId: string) {
    const consumer = this.items.find((item) => item.userId === userId);

    if (!consumer) {
      return null;
    }

    return consumer;
  }

  async findById(id: string) {
    const consumer = this.items.find((item) => item.id === id);

    if (!consumer) {
      return null;
    }

    return consumer;
  }

  async delete(id: string) {
    const consumerIndex = this.items.findIndex((item) => item.id === id);

    if (consumerIndex === -1) {
      throw new Error('Consumer not found');
    }

    const consumer = this.items[consumerIndex];

    this.items.splice(consumerIndex, 1);

    return consumer;
  }

  async save(consumer: Consumer) {
    const consumerIndex = this.items.findIndex(
      (item) => item.id === consumer.id,
    );

    if (consumerIndex >= 0) {
      this.items[consumerIndex] = consumer;
    }

    return consumer;
  }
}
