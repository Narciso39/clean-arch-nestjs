import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from './../src/app.module';
import { EnvConfigService } from '../src/shared/infrastructure/env-config/env-config.service';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  const mockEnvConfigService = {
    getAppPort: jest.fn().mockReturnValue(3000),
    getNodeEnv: jest.fn().mockReturnValue('test'),
  };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(EnvConfigService)
      .useValue(mockEnvConfigService)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  afterEach(async () => {
    await app.close();
  });
});
