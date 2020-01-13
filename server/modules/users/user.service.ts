import { Inject, Injectable, NotImplementedException, Logger, BadRequestException, NotFoundException } from '@nestjs/common';
// import { IUserService } from './interfaces/user-service.interface';
import { ModelUser } from '../../mongo/models/user.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IUserPagination } from '../../mongo/interfaces/users/user.pagination.interface';

@Injectable()
export class UserService {
    logger = new Logger('UserService')
    constructor(
        @InjectModel('USER_MODEL') private readonly userModel: Model<ModelUser>,
    ) {

    }

    public async searchAll(limit, skip, search): Promise<IUserPagination> {
        if (limit > 100) {
            this.logger.warn('searchAll was requested with a larger limit that provided.')
            throw new BadRequestException('Can not return for high limits')
        }
        try {
            const query = { title: { $regex: search, $options: 'i' } };
            const users = await this.userModel.find(query).limit(Number(limit)).skip(Number(skip));
            const count = await this.userModel.countDocuments(query);
            let pagination = {
                limit,
                skip,
                count,
                pageIndex: 0,
                previousPageIndex: 0
            };
            const data = {
                users,
                pagination
            } as IUserPagination;
            return data
        } catch (error) {
            this.logger.error(`Failed on the searchAll Method`, error.stack)
            throw new BadRequestException('Could not complete search for equipment', error);
        }
    }

    public async findOne(options): Promise<ModelUser | null> {
        try {
            const user = await this.userModel.findOne(options);
            // if (!user) {
            //     throw new NotFoundException(`Could not find user with query ${JSON.stringify(options)}`);
            // }
            return user;
        } catch (error) {
            console.log(error);
            throw new BadRequestException(error);
        }
    }

    public async findById(id: string): Promise<ModelUser | null> {
        try {
            return await this.userModel.findOne({ _id: id })
        } catch (error) {
            throw new NotFoundException('Could not find this user', error.toString());
        }
    }

    public async update(user: ModelUser): Promise<ModelUser> {
        if (!user._id) {
            throw new BadRequestException('Missing data')
        }
        const User = await this.userModel.findById({ _id: user._id });
        if (!User) {
            throw new NotFoundException(`Could not find a movement with those details to update. It may have been deleted already.`)
        }
        try {
            User.updated_at = new Date();
            return await User.save()
        } catch (error) {
            console.log(error);
            throw new BadRequestException('Could Not Update', error.toString());
        }
    }

    public async create(user): Promise<ModelUser> {
        try {
            const newUser = await new this.userModel(user);
            return await newUser.save();
        } catch (error) {
            console.log(error);
            throw new BadRequestException('', error);
        }
    }

    public async delete(user_id: string): Promise<ModelUser> {
        try {
            const User = await this.userModel.findById({ _id: user_id })
            return await User.update({ archived: true })
        } catch (error) {
            console.log(error);
            throw new BadRequestException('', error);
        }
    }

}
