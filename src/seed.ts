import { Factory, Seeder } from 'typeorm-seeding';
import { Group } from './security/group/entities/group';
import { Role } from './security/role/entities/role';
import { User } from './security/user/entities/user';
import { Profile } from './profiles/profile/entities/profile';
import { Access } from './membership/entities/access';
import { Claim, Entity } from './security/common/claim';
import { Key } from './security/common/key';
import { Hasher } from './common/helpers/hash';

interface Member {
  email: string;
  name: string;
  classifier: string;
  isFixed: boolean;
  role: Role;
  key: Key;
}

const SYSTEM_KEY = { start: 0, end: 9999999999999999 };
const GUEST_KEY = { start: 0, end: 99999999999999 };

export class Initial implements Seeder {
  async member(factory: Factory, data: Member): Promise<void> {
    const hash = new Hasher();

    const { email, name, isFixed, role, key, classifier } = data;

    const password = hash.generate(name.toLowerCase()).hash;

    const user = await factory(User)().create({ email, isFixed, password, key, roles: [ role ] });
    const profile = await factory(Profile)().create({ name, classifier, isFixed, key });

    await factory(Access)().create({ user: user.id, profile: profile.id });
  }

  public async run(factory: Factory): Promise<void> {
    const parent = await factory(Group)()
    .create({ name: 'System', key: SYSTEM_KEY, isFixed: true });

    await factory(Group)()
    .create({ name: 'Guest', key: GUEST_KEY, parent, isFixed: true });

    const systemClaims: Claim[] = [{ entity: Entity.User, right: 15 }, { entity: Entity.Group, right: 15 }, { entity: Entity.Profile, right: 15 }];
    const guestClaims: Claim[] = [{ entity: Entity.User, right: 3 }, { entity: Entity.Profile, right: 3 }];

    const system = await factory(Role)()
    .create({ name: 'system', isFixed: true, claims: systemClaims });
    const guest = await factory(Role)()
    .create({ name: 'guest', isFixed: true, claims: guestClaims });

    await this.member(factory, { email: 'system@recipher.co.uk', name: 'System', classifier: 'staff', isFixed: true, role: system, key: SYSTEM_KEY });
    await this.member(factory, { email: 'guest@recipher.co.uk', name: 'Guest', classifier: 'staff', isFixed: true, role: guest, key: GUEST_KEY });
  }
}
