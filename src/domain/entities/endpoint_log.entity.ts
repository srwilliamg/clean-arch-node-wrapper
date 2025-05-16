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
import { jsonBTransformer } from './tools/transformers';

const prefix = 'enl_';

@Index(`${prefix}_name_idx`, ['name'], {})
@Entity(DATABASE.ENDPOINT_LOG, { schema: DATABASE.SCHEMA })
export class EndpointLog {
  @PrimaryColumn({
    type: `bigint`,
    name: `${prefix}id`,
    default: () => generateSequence(DATABASE.SCHEMA, DATABASE.ENDPOINT_LOG),
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
    type: 'jsonb',
    name: `${prefix}payload`,
    nullable: false,
    transformer: jsonBTransformer,
  })
  payload: any;

  @Column({
    type: 'jsonb',
    name: `${prefix}response`,
    nullable: false,
    transformer: jsonBTransformer,
  })
  response: any;

  @Column({
    type: 'timestamp without time zone',
    name: `${prefix}start_time`,
    nullable: true,
  })
  startTime: string;

  @Column({
    type: 'timestamp without time zone',
    name: `${prefix}end_time`,
    nullable: true,
  })
  endTime: string;

  @Column({
    type: 'numeric',
    name: `${prefix}executionTime`,
    nullable: true,
  })
  executionTime: number;

  @CreateDateColumn({ name: `${prefix}created_at`, nullable: false })
  createdAt: string;

  @UpdateDateColumn({ name: `${prefix}updated_at`, nullable: false })
  updatedAt: string;

  @DeleteDateColumn({ name: `${prefix}deleted_at`, nullable: true })
  deletedAt: string;
}
