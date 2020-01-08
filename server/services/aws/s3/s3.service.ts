import { Injectable, Inject, BadRequestException } from '@nestjs/common';
import { S3 } from 'aws-sdk';
import { ClientConfiguration } from 'aws-sdk/clients/dlm';
import { PutObjectRequest, HeadObjectOutput, DeleteObjectOutput, DeleteObjectRequest } from 'aws-sdk/clients/s3';
import { AWSError } from 'aws-sdk';


@Injectable()
export class AWSS3Service {
    constructor(
        // @Inject('AWS_S3') s3
    ) {
    }

    async uploadS3AndWait(params: PutObjectRequest): Promise<any> {
        try {
            const AWS_S3_CONFIG = {
                accessKeyId: process.env.AWS_KEY,
                secretAccessKey: process.env.AWS_SECRET,
            } as ClientConfiguration;
            const s3 = new S3(AWS_S3_CONFIG);
            const upload = await s3.upload(params).promise();
            return await this.checkForObject(upload);
        } catch (error) {
            throw new BadRequestException('Could not upload to S3', error)
        }
    }

    async checkForObject(params: PutObjectRequest): Promise<HeadObjectOutput | AWSError> {
        const AWS_S3_CONFIG = {
            accessKeyId: process.env.AWS_KEY,
            secretAccessKey: process.env.AWS_SECRET,
        } as ClientConfiguration;
        const s3 = new S3(AWS_S3_CONFIG);
        return s3.waitFor('objectExists', { Bucket: params.Bucket, Key: params.Key }).promise()
            .then((uploaded) => {
                return Promise.resolve(uploaded);
            })
            .catch((err) => {
                console.log(err);
                return Promise.reject(err);
            });
    }

    getObjectLocation(params: PutObjectRequest) {
        const AWS_S3_CONFIG = {
            accessKeyId: process.env.AWS_KEY,
            secretAccessKey: process.env.AWS_SECRET,
        } as ClientConfiguration;
        const s3 = new S3(AWS_S3_CONFIG);
        return s3.getSignedUrl('getObject', params);
    }

    async deleteS3Object(params: DeleteObjectRequest): Promise<DeleteObjectOutput | AWSError> {
        const AWS_S3_CONFIG = {
            accessKeyId: process.env.AWS_KEY,
            secretAccessKey: process.env.AWS_SECRET,
        } as ClientConfiguration;
        const s3 = new S3(AWS_S3_CONFIG);
        return s3.deleteObject(params).promise()
            .then((deleted) => {
                return Promise.resolve(deleted);
            }).catch((err) => {
                console.log('ErrorDescription', err);
                return Promise.reject(err);
            });
    }

}
