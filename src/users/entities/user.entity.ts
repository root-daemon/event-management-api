import { Exclude } from 'class-transformer';

export class User {
  id: string;
  email: string;

  @Exclude()
  password: string;

  isVerified: boolean = false;

  @Exclude()
  verificationToken?: string;

  @Exclude()
  passwordResetToken?: string;

  @Exclude()
  passwordResetExpires?: Date;

  createdAt: Date;
  updatedAt: Date;
}
