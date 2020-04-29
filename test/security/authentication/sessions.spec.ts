import * as request from 'supertest';
import { ok } from 'assert';
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { ApplicationModule } from '../../../src/app';

describe('Authentication', () => {
  let app: INestApplication;

  before(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [ApplicationModule],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  after(async () => await app.close());

  it('POST /sessions', async () => {
    return await request(app.getHttpServer())
      .post('/sessions')
      .send({ email: 'system@recipher.co.uk', password: 'system' })
      .expect(201)
      .then(response => ok(response.body.token));
  });

  it('POST /sessions', async () => {
    return await request(app.getHttpServer())
      .post('/sessions')
      .send({ email: 'system@recipher.co.uk', password: 'password' })
      .expect(404);
  });
});
