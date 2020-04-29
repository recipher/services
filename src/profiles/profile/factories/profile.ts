import * as Faker from 'faker';
import { define } from 'typeorm-seeding';
import { Profile } from '../entities/profile';

define(Profile, (faker: typeof Faker) => {
  const profile = new Profile();

  profile.name = faker.name.findName();

  return profile;
});
