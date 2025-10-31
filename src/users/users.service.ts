import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { DatabaseService } from '../config/database.service';

@Injectable()
export class UsersService {
  private insertUser;
  private findUserByEmailQuery;
  private findUserByIdQuery;

  constructor(private dbService: DatabaseService) {
    // Prepare statements for better performance
    this.insertUser = this.dbService.db.prepare(`
      INSERT INTO users (id, email, password, "isVerified", "verificationToken", "createdAt", "updatedAt")
      VALUES ($id, $email, $password, $isVerified, $verificationToken, $createdAt, $updatedAt)
    `);

    this.findUserByEmailQuery = this.dbService.db.prepare(`
      SELECT * FROM users WHERE email = $email
    `);

    this.findUserByIdQuery = this.dbService.db.prepare(`
      SELECT * FROM users WHERE id = $id
    `);
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { email, password } = createUserDto;

    // Check if user with email already exists
    const existingUser = this.findUserByEmailQuery.get({ $email: email }) as any;
    if (existingUser) {
      throw new ConflictException('Email already in use');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const id = crypto.randomUUID();
    const now = new Date().toISOString();
    const verificationToken = this.generateRandomToken();

    this.insertUser.run({
      $id: id,
      $email: email,
      $password: hashedPassword,
      $isVerified: 0,
      $verificationToken: verificationToken,
      $createdAt: now,
      $updatedAt: now,
    });

    return this.findById(id);
  }

  async findByEmail(email: string): Promise<User | null> {
    const row = this.findUserByEmailQuery.get({ $email: email }) as any;
    if (!row) return null;
    return this.mapRowToUser(row);
  }

  async findById(id: string): Promise<User> {
    const row = this.findUserByIdQuery.get({ $id: id }) as any;
    if (!row) {
      throw new NotFoundException('User not found');
    }
    return this.mapRowToUser(row);
  }

  private mapRowToUser(row: any): User {
    const user = new User();
    user.id = row.id;
    user.email = row.email;
    user.password = row.password;
    user.isVerified = Boolean(row.isVerified);
    user.verificationToken = row.verificationToken || undefined;
    user.passwordResetToken = row.passwordResetToken || undefined;
    user.passwordResetExpires = row.passwordResetExpires
      ? new Date(row.passwordResetExpires)
      : undefined;
    user.createdAt = new Date(row.createdAt);
    user.updatedAt = new Date(row.updatedAt);
    return user;
  }

  private generateRandomToken(): string {
    return (
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15)
    );
  }
}
