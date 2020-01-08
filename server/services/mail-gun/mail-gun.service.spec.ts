import { Test, TestingModule } from '@nestjs/testing';
import { MailGunService } from './mail-gun.service';

describe('MailGunService', () => {
  let service: MailGunService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MailGunService],
    }).compile();

    service = module.get<MailGunService>(MailGunService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
