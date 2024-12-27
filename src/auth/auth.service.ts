// // src/auth/auth.service.ts
// import { Injectable, UnauthorizedException } from '@nestjs/common';
// import { JwtService } from '@nestjs/jwt';
// import { InjectModel } from '@nestjs/mongoose';
// import { Model } from 'mongoose';
// import * as bcrypt from 'bcrypt';
// import { User } from '../schema/user.schema';

// @Injectable()
// export class AuthService {
//   constructor(
//     @InjectModel(User.name) private userModel: Model<User>,
//     private jwtService: JwtService,
//   ) {}

//   // Sign Up
//   async signUp(name: string, email: string, password: string): Promise<User> {
//     const hashedPassword = await bcrypt.hash(password, 10);
//     const newUser = new this.userModel({
//       name,
//       email,
//       password: hashedPassword,
//     });
//     return newUser.save();
//   }

//   // Login
//   async login(
//     email: string,
//     password: string,
//   ): Promise<{ status: string; accessToken: string | null }> {
//     const user = await this.userModel.findOne({ email });
//     if (!user || !(await bcrypt.compare(password, user.password))) {
//       return { status: 'error', accessToken: 'Invalid Email or Password' };
//     }

//     const payload = { email: user.email, sub: user._id };
//     const accessToken = this.jwtService.sign(payload);
//     return { status: 'success', accessToken };
//   }
//   // Reset Password
//   async resetPassword(
//     email: string,
//     newPassword: string,
//   ): Promise<{ status: string; message: string }> {
//     const user = await this.userModel.findOne({ email });
//     if (!user) {
//       return { status: 'error', message: 'Failed to update' };
//     }

//     user.password = await bcrypt.hash(newPassword, 10);
//     await user.save();
//     return { status: 'success', message: 'Password Reset Successfully' };
//   }
// }

// src/auth/auth.service.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User } from '../schema/user.schema';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  // Generate Tokens
  private async generateTokens(user: User) {
    const payload = { email: user.email, sub: user._id };

    const accessToken = this.jwtService.sign(payload, { expiresIn: '1h' });
    const refreshToken = this.jwtService.sign(payload, { expiresIn: '2d' });

    return { accessToken, refreshToken };
  }

  // Login
  async login(
    email: string,
    password: string,
  ): Promise<{ status: string; accessToken: string; refreshToken: string }> {
    const user = await this.userModel.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Invalid Email or Password');
    }

    const tokens = await this.generateTokens(user);
    return { status: 'success', ...tokens };
  }
  // Sign Up
  async signUp(name: string, email: string, password: string): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new this.userModel({
      name,
      email,
      password: hashedPassword,
    });
    return newUser.save();
  }

  // Refresh Token
  async refreshToken(refreshToken: string): Promise<{ accessToken: string }> {
    try {
      const payload = this.jwtService.verify(refreshToken, {
        secret: 'abewyxcbczpldubk', // Use environment variable for the secret
      });
      const user = await this.userModel.findById(payload.sub);

      if (!user) throw new UnauthorizedException();

      const accessToken = this.jwtService.sign(
        { email: user.email, sub: user._id },
        { expiresIn: '1h' },
      );

      return { accessToken };
    } catch (err) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  // Reset Password
  async resetPassword(
    email: string,
    newPassword: string,
  ): Promise<{ status: string; message: string }> {
    const user = await this.userModel.findOne({ email });
    if (!user) {
      return { status: 'error', message: 'Failed to update' };
    }

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();
    return { status: 'success', message: 'Password Reset Successfully' };
  }
}
