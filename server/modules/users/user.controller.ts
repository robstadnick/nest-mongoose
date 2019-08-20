import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';
import { UserService } from './user.service';
import { MessageCodeError } from '../../errors';

@Controller('users')
export class UserController {

    constructor(
        private readonly _userService: UserService
    ) {
    }

    @Get()
    public async index(@Res() res) {
        const users = await this._userService.findAll();
        return res.status(HttpStatus.OK).json(users);
    }

    @Post()
    public async create(@Body() body, @Res() res) {
        if (!body || (body && Object.keys(body).length === 0)) {
            throw new MessageCodeError('user:create:missingInformation');
        }
        await this._userService.create(body);
        return res.status(HttpStatus.CREATED).send();
    }

    @Get(':id')
    public async show(@Param('id') id: string, @Res() res) {
        if (!id) { throw new MessageCodeError('user:show:missingId'); }
        const user = await this._userService.findById(id);
        return res.status(HttpStatus.OK).json(user);
    }

    @Put(':id')
    public async update(@Body() body, @Param('id') id: string, @Res() res) {
        if (!id) { throw new MessageCodeError('user:update:missingId'); }
        await this._userService.updateSingleUser(id, body);
        return res.status(HttpStatus.OK).send();
    }

    // @Delete(':id')
    // public async delete(@Param('id') id: string, @Res() res) {
    //     if (!id) { throw new MessageCodeError('user:delete:missingId'); }

    //     await this._userService.delete(id);
    //     return res.status(HttpStatus.OK).send();
    // }
}
