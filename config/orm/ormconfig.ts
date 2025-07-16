import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

dotenv.config();
//console.log('Loading ORM configuration...', process.env);
const appPath = __dirname + '/../../';
const config: PostgresConnectionOptions = {
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: +process.env.DATABASE_PORT,
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASS,
  database: process.env.DATABASE_NAME,
  schema: 'public',
  entities: [appPath + 'src/domain/entities/**/*.entity{.js,.ts}'],
  migrations: [appPath + 'migrations/**/*{.js,.ts}'],
  migrationsTransactionMode: 'all',
  synchronize: false,
};

export default config;
