import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../models/user.entity';
import { IUser } from '../models/user.interface';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private userRepository: Repository<UserEntity>
    ) {}

    async add(user: IUser): Promise<IUser> {
        return await this.userRepository.save(user);
    }

    async findAll(): Promise<IUser[]> {
        return await this.userRepository.find();
    }
}
