import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AuthRepositoryPort } from '../../../../domain/ports/out/auth-repository.port';
import { UserEntity } from '../../../../domain/entities/user.entity';
import { UserDocument } from './schemas/user.schema';

@Injectable()
export class MongooseAuthRepository implements AuthRepositoryPort {
  constructor(
    @InjectModel(UserDocument.name)
    private readonly userModel: Model<UserDocument>,
  ) {}

  async findByEmail(email: string): Promise<UserEntity | null> {
    throw new Error('Not implemented');
  }

  async findById(id: string): Promise<UserEntity | null> {
    throw new Error('Not implemented');
  }

  async save(user: UserEntity): Promise<UserEntity> {
    throw new Error('Not implemented');
  }
}
