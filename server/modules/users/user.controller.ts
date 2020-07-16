import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res, BadRequestException, Logger, Query, NotFoundException } from '@nestjs/common';
import { UserService } from './user.service';
import { Response } from 'express'
import { ModelUser } from '../../mongo/models/users/user.model';
import { IUser } from '../../mongo/interfaces/users/user.interface';

@Controller('api/users')
export class UserController {

    logger = new Logger('CONTROLLERNAME')

    constructor(
        private readonly _userService: UserService
    ) {
    }

    // @Get()
    // public async index(@Res() res: Response) {
    //     const objects = await this._userService.findAll();
    //     return res.status(HttpStatus.OK).json(objects);
    // }

    @Get('search')
    public async getQuery(@Res() res: Response, @Query('search') search: string, @Query('skip') skip: number, @Query('limit') limit: number, ) {
        const objects = await this._userService.searchAll(limit, skip, search);
        return res.status(HttpStatus.OK).json(objects);
    }

    @Post()
    public async create(@Body() body: IUser, @Res() res: Response) {
        if (!body || (body && Object.keys(body).length === 0)) {
            throw new NotFoundException(`Can not find ${body.profile.first_name} to updated, try creating it first`);
        }
        const updatedOBJECTS = await this._userService.create(body);
        return res.status(HttpStatus.CREATED).send(updatedOBJECTS);
    }

    /**
     *
     * @param id ID for the object you are trying to retreive
     */
    @Get(':id')
    public async show(@Param('id') id: string, @Res() res: Response) {
        if (!id) { throw new BadRequestException('Please include data with your request'); }
        const OBJECT = await this._userService.findById(id);
        return res.status(HttpStatus.OK).json(OBJECT);
    }

    /**
     *
     * @param id ID for the object you are trying to retreive
     * @param body {IOBJECT}
     * @return {IOBJECT} 
     */
    @Put()
    public async update(@Body() body: ModelUser, @Res() res: Response) {
        if (!body) { throw new BadRequestException('Please include a body with your request') }
        const user = await this._userService.update(body);
        return res.status(HttpStatus.OK).send(user);
    }

    @Delete(':id')
    public async delete(@Param('id') id: string, @Res() res: Response) {
        if (!id) { throw new BadRequestException('Please include a body with your request'); }
        await this._userService.delete(id);
        return res.status(HttpStatus.OK).send();
    }
}
