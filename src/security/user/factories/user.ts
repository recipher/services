import * as Faker from 'faker';
import { define } from 'typeorm-seeding';
import { User } from '../entities/user';

define(User, (faker: typeof Faker) => {
  const user = new User();

  user.email = faker.internet.email();

  return user;
});
