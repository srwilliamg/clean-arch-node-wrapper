import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

import { DATABASE } from '../../constants';
import { generateSequence } from './tools/sequence-generator';

const prefix = 'tb_';

@Index(`${prefix}_name_idx`, ['name'], {})
@Index(`${prefix}_extId_idx`, ['extId'], {})
@Entity(DATABASE.POKEMON, { schema: DATABASE.SCHEMA })
export class Pokemon {
  @PrimaryColumn({
    type: `bigint`,
    name: `${prefix}id`,
    default: () => generateSequence(DATABASE.SCHEMA, DATABASE.POKEMON),
  })
  id: number;

  @Column({
    type: `varchar`,
    name: `${prefix}name`,
    nullable: true,
    length: 100,
  })
  name: string;

  @Column({
    type: `bigint`,
    name: `${prefix}ext_id`,
    nullable: false,
  })
  extId: number;

  @Column({
    type: `int`,
    name: `${prefix}weight`,
    nullable: true,
  })
  weight: number;

  @Column({
    type: `int`,
    name: `${prefix}height`,
    nullable: true,
  })
  height: number;

  @Column({
    type: `varchar`,
    name: `${prefix}url_back_default`,
    nullable: true,
    length: 300,
  })
  urlBackDefault: string;

  @Column({
    type: `varchar`,
    name: `${prefix}url_front_default`,
    nullable: true,
    length: 300,
  })
  urlFrontDefault: string;

  @CreateDateColumn({ name: `${prefix}created_at`, nullable: false })
  createdAt: Date;

  @UpdateDateColumn({ name: `${prefix}updated_at`, nullable: false })
  updatedAt: Date;

  @DeleteDateColumn({ name: `${prefix}deleted_at`, nullable: true })
  deletedAt: Date;
}
