import { Database } from 'bun:sqlite';
import { mkdir } from 'fs/promises';
import { dirname } from 'path';
import * as dotenv from 'dotenv';

// Load environment variables
if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}

async function initializeDatabase() {
  const dbPath = process.env.DATABASE_PATH || './data/event_management.db';
  
  console.log(`Initializing database at: ${dbPath}`);

  // Ensure directory exists
  const dbDir = dirname(dbPath);
  await mkdir(dbDir, { recursive: true });
  console.log(`Database directory ensured: ${dbDir}`);

  // Open database connection
  const db = new Database(dbPath, { create: true });

  // Enable WAL mode for better concurrency
  db.exec('PRAGMA journal_mode = WAL;');
  console.log('WAL mode enabled');

  try {
    // Create users table
    db.exec(`
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
    console.log('✓ Users table created/verified');

    // Create events table
    db.exec(`
      CREATE TABLE IF NOT EXISTS events (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        location TEXT NOT NULL,
        time TEXT NOT NULL,
        description TEXT NOT NULL
      )
    `);
    console.log('✓ Events table created/verified');

    console.log('Database initialization completed successfully!');
  } catch (error) {
    console.error('Error initializing database:', error);
    process.exit(1);
  } finally {
    db.close();
  }
}

initializeDatabase();

