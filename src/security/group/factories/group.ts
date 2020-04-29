import * as Faker from 'faker';
import { define } from 'typeorm-seeding';
import { Group } from '../entities/group';

define(Group, (faker: typeof Faker) => {
  const group = new Group();

  group.name = faker.random.word();

  return group;
});
