import { Module, RequestMethod } from '@nestjs/common';
import { MiddlewareConsumer } from '@nestjs/common/interfaces/middleware';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { AuthMiddleware } from '../../auth/middleware/auth.middleware';
import { MongooseModule, getModelToken } from '@nestjs/mongoose';
import { UserSchema, ModelUser } from './interfaces/user.model';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: 'USER_MODEL', schema: UserSchema },
        ]),
    ],
    controllers: [
        UserController,
    ],
    providers: [
        // ...userProviders,
        UserService,
    ],
    exports: [
        UserService
    ]
})
export class UserModule {
    // public configure(consumer: MiddlewareConsumer) {
    //     consumer
    //         .apply(AuthMiddleware)
    //         .forRoutes(
    //             { path: '/users', method: RequestMethod.GET },
    //             { path: '/users/:id', method: RequestMethod.GET },
    //             { path: '/users/:id', method: RequestMethod.PUT },
    //             { path: '/users/:id', method: RequestMethod.DELETE }
    //         );
    // }
}
