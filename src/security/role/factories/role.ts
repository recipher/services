import * as Faker from 'faker';
import { define } from 'typeorm-seeding';
import { Role } from '../entities/role';

define(Role, (faker: typeof Faker) => {
  const role = new Role();

  role.name = faker.random.word();

  return role;
});
