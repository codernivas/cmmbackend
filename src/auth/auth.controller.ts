// // src/auth/auth.controller.ts
// import { Body, Controller, Post } from '@nestjs/common';
// import { AuthService } from './auth.service';

// @Controller('auth')
// export class AuthController {
//   constructor(private readonly authService: AuthService) {}

//   // Sign Up
//   @Post('signup')
//   async signUp(
//     @Body('name') name: string,
//     @Body('email') email: string,
//     @Body('password') password: string,
//   ) {
//     const user = await this.authService.signUp(name, email, password);
//     return { status: 'success', message: 'User created Successfully' }; // No access token for signup
//   }

//   // Login
//   @Post('login')
//   async login(
//     @Body('email') email: string,
//     @Body('password') password: string,
//   ) {
//     return this.authService.login(email, password);
//   }

//   // Reset Password
//   @Post('reset')
//   async resetPassword(
//     @Body('email') email: string,
//     @Body('newPassword') newPassword: string,
//   ) {
//     return this.authService.resetPassword(email, newPassword);
//   }
// }



// src/auth/auth.controller.ts
import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // Sign Up
  @Post('signup')
  async signUp(
    @Body('name') name: string,
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    const user = await this.authService.signUp(name, email, password);
    return { status: 'success', message: 'User created Successfully' };
  }

  // Login
  @Post('login')
  async login(
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    return this.authService.login(email, password);
  }

  // Refresh Token
  @Post('refresh')
  async refresh(@Body('refreshToken') refreshToken: string) {
    return this.authService.refreshToken(refreshToken);
  }

  // Reset Password
  @Post('reset')
  async resetPassword(
    @Body('email') email: string,
    @Body('newPassword') newPassword: string,
  ) {
    return this.authService.resetPassword(email, newPassword);
  }
}
