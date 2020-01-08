import { Test, TestingModule } from '@nestjs/testing';
import { AWSS3Service } from './s3.service';

describe('AWSS3Service', () => {
  let service: AWSS3Service;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AWSS3Service],
    }).compile();

    service = module.get<AWSS3Service>(AWSS3Service);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
