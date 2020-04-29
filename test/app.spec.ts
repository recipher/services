import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { ApplicationModule } from '../src/app';

describe('Application', () => {
  let app: INestApplication;

  before(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [ApplicationModule],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  after(async () => await app.close());

  it('GET /', async () => {
    return await request(app.getHttpServer())
      .get('/')
      .expect(404);
  });
});
