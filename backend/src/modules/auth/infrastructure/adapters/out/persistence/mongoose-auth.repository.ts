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
    const doc = await this.userModel.findOne({ email }).exec();
    return doc ? this.toEntity(doc) : null;
  }

  async findById(id: string): Promise<UserEntity | null> {
    const doc = await this.userModel.findById(id).exec();
    return doc ? this.toEntity(doc) : null;
  }

  async save(user: UserEntity): Promise<UserEntity> {
    const created = new this.userModel({
      email: user.email,
      passwordHash: user.passwordHash,
      name: user.name,
      role: user.role,
    });
    const saved = await created.save();
    return this.toEntity(saved);
  }

  private toEntity(doc: UserDocument): UserEntity {
    const entity = new UserEntity();
    entity.id = (doc._id as any).toString();
    entity.email = doc.email;
    entity.passwordHash = doc.passwordHash;
    entity.name = doc.name;
    entity.role = doc.role as any;
    entity.createdAt = (doc as any).createdAt;
    entity.updatedAt = (doc as any).updatedAt;
    return entity;
  }
}
