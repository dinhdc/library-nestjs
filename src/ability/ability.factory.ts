import {
  InferSubjects,
  Ability,
  AbilityBuilder,
  AbilityClass,
  ExtractSubjectType,
} from '@casl/ability';

import { Injectable } from '@nestjs/common';
import { Book } from 'src/book/entities/book.entity';
import { User as UserEntity } from '../user/entities/user.entity';

export enum Action {
  ADMIN = 'admin',
  READER = 'reader',
  READ = 'read',
}

export type Subjects = InferSubjects<typeof UserEntity | typeof Book | 'all'>;

export type AppAbility = Ability<[Action, Subjects]>;

@Injectable()
export class AbilityFactory {
  defineAbility(user: UserEntity) {
    const { can, cannot, build } = new AbilityBuilder(
      Ability as AbilityClass<AppAbility>,
    );

    if (user.roles == 'admin') {
      can(Action.ADMIN, Book);
      can(Action.READER, UserEntity);
    } else if (user.roles == 'reader') {
      cannot(Action.ADMIN, UserEntity).because(
        'You are not authorized to do this',
      );
      can(Action.READER, Book);
    } else {
      can(Action.READ, Book);
    }

    return build({
      detectSubjectType: (item) =>
        item.constructor as ExtractSubjectType<Subjects>,
    });
  }
}
