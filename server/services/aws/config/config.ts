import * as AWS from 'aws-sdk'
import { ClientConfiguration } from 'aws-sdk/clients/dlm';

const AWS_S3_CONFIG = {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    // apiVersion: 
} as ClientConfiguration;

export const awsProviders = [
    {
        provide: 'AWS_S3',
        useFactory: async () => {
            try {
                return new AWS.S3(AWS_S3_CONFIG)
            } catch (error) {
                console.log(error);
                return Promise.reject(error);
            }
        }
    },
    {
        provide: 'AWS_SAGEMAKER',
        useFactory: async () => {
            return new AWS.SageMakerRuntime(AWS_S3_CONFIG);
        }
    },
];
