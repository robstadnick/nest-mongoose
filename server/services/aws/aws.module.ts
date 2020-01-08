import { Module } from '@nestjs/common';
import { AWSS3Service } from './s3/s3.service';
import { awsProviders } from './config/config';

@Module({
  providers: [
    AWSS3Service,
    ...awsProviders,
    
  ],
  exports: [
    AWSS3Service,
    
  ],
  imports: [
  ]
})

export class AwsModule { }
