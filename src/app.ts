import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SecurityModule } from './security/module';
import { CommonModule } from './common/module';
import { ConfigurationModule } from './configuration/module';
import { ConfigurationService } from './configuration/service';
import { ProfilesModule } from './profiles/module';
import { MembershipModule } from './membership/module';
import { ContactModule } from './contact/module';
import { TagsModule } from './tags/module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ ConfigurationService ],
      useFactory: (config: ConfigurationService) =>
        require(`../config/database/${config.get('node:env')}`),
    }),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    SecurityModule,
    ProfilesModule,
    MembershipModule,
    // ContactModule,
    TagsModule,
    CommonModule,
    ConfigurationModule,
  ],
})
export class ApplicationModule {}
