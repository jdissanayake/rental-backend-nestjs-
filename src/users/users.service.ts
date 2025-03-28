import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { ObjectId } from 'mongodb';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepo: Repository<UserEntity>,
    ) {}

    async getUser() {
        return this.userRepo.find();
    }

    async createUser(user: UserEntity) {
        return this.userRepo.save(user);
    }

    // Delete user by ID
    async deleteUser(id: string): Promise<void> {
        const objectId = new ObjectId(id); // Convert string to ObjectId
        const result = await this.userRepo.delete(objectId);

        if (result.affected === 0) {
            throw new NotFoundException(`User with ID ${id} not found`);
        }
    }

    // Update user by ID
    async updateUser(id: string, userData: Partial<UserEntity>): Promise<UserEntity> {
        const objectId = new ObjectId(id); // Convert string to ObjectId
        const user = await this.userRepo.findOne({ where: { _id: objectId } });

        if (!user) {
            throw new NotFoundException(`User with ID ${id} not found`);
        }

        // Update the user with the provided data
        Object.assign(user, userData);

        // Save the updated user
        return this.userRepo.save(user);
    }
}
