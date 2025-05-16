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
@Entity(DATABASE.TABLE, { schema: DATABASE.SCHEMA })
export class Table {
  @PrimaryColumn({
    type: `bigint`,
    name: `${prefix}id`,
    default: () => generateSequence(DATABASE.SCHEMA, DATABASE.TABLE),
  })
  id: number;

  @Column({
    type: `varchar`,
    name: `${prefix}name`,
    nullable: true,
    length: 100,
  })
  name: string;

  @CreateDateColumn({ name: `${prefix}created_at`, nullable: false })
  createdAt: string;

  @UpdateDateColumn({ name: `${prefix}updated_at`, nullable: false })
  updatedAt: string;

  @DeleteDateColumn({ name: `${prefix}deleted_at`, nullable: true })
  deletedAt: string;
}
