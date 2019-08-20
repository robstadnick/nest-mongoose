import { Inject, Injectable, NotImplementedException } from '@nestjs/common';
import { MessageCodeError } from '../../errors';
// import { IUserService } from './interfaces/user-service.interface';
import { ModelUser } from './interfaces/user.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
    constructor(
        @InjectModel('USER_MODEL') private readonly userModel: Model<ModelUser>,
    ) {
    }

    public async findAll(): Promise<Array<ModelUser>> {
        return await this.userModel.find();
    }

    public async findOne(options: any): Promise<ModelUser | null> {
        return await this.userModel.findOne(options);
    }

    public async findById(id: string): Promise<ModelUser | null> {
        return await this.userModel.findById(id);
    }

    public async create(user: ModelUser): Promise<ModelUser> {
        const newUser = new this.userModel(user);
        return await newUser.save();
    }

    public async updateSingleUser(id: string, user: ModelUser): Promise<ModelUser | null> {
        try {
            const User = await this.userModel.findById(id);
            User.last_name = user.last_name;
            User.first_name = user.first_name;
            User.addresses = user.addresses;
            User.user_roles = user.user_roles;
            User.save();
            return Promise.resolve(User);
        } catch (error) {
            throw new NotImplementedException(error);
        }
    }

}
