import { Injectable, type OnModuleInit } from '@nestjs/common';
import { Database } from 'bun:sqlite';
import { mkdir } from 'fs/promises';
import { dirname } from 'path';

@Injectable()
export class DatabaseService implements OnModuleInit {
  public db: Database;

  constructor() {
    const dbPath = process.env.DATABASE_PATH || './data/event_management.db';

    // Ensure directory exists
    const dbDir = dirname(dbPath);
    mkdir(dbDir, { recursive: true }).catch(() => {
      // Ignore error if directory already exists
    });

    this.db = new Database(dbPath, { create: true });

    // Enable WAL mode for better concurrency
    this.db.exec('PRAGMA journal_mode = WAL;');
  }

  async onModuleInit() {
    await this.initializeTables();
  }

  private async initializeTables() {
    // Create users table
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        "isVerified" INTEGER DEFAULT 0,
        "verificationToken" TEXT,
        "passwordResetToken" TEXT,
        "passwordResetExpires" TEXT,
        "createdAt" TEXT NOT NULL,
        "updatedAt" TEXT NOT NULL
      )
    `);

    // Create events table
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS events (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        location TEXT NOT NULL,
        time TEXT NOT NULL,
        description TEXT NOT NULL
      )
    `);
  }
}
