import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const getDatabaseConfig = (): TypeOrmModuleOptions => ({
  type: 'postgres',
  host: process.env.DATABASE_HOST || 'localhost',
  port: parseInt(process.env.DATABASE_PORT || '5432', 10),
  username: process.env.DATABASE_USER || 'root_daemon',
  password: process.env.DATABASE_PASSWORD || 'justdoit',
  database: process.env.DATABASE_NAME || 'event_management',
  autoLoadEntities: true,
  synchronize: true, // Set to false in production
});
