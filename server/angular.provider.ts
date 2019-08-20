import { Module, OnModuleInit, DynamicModule } from '@nestjs/common';
import { AngularUniversalModule } from '@nestjs/ng-universal';
import { join } from 'path';

@Module({
    imports: [

    ],
    providers: []
})
export class AngularModule {
    static async asyncAfterLoad() {  // this does not work, it's just an idea
        console.log('Starting Load');
        const timeout = ms => new Promise(res => setTimeout(res, ms));
        await timeout(2500);
        return {
            module: AngularModule,
            imports: [
                AngularUniversalModule.forRoot({
                    viewsPath: join(process.cwd(), 'dist/browser'),
                    bundle: require('../server/main'),
                    liveReload: true
                }),
            ],
        };
    }
}


