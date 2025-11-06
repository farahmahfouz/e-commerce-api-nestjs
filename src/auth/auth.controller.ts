import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ChangePasswordDto, ResetPasswordDto, SignInDto, SignUpDto } from './dto/auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('signup')
  signUp(@Body() createAuthDto: SignUpDto) {
    return this.authService.signUp(createAuthDto);
  }

  @Post('signin')
  signIn(@Body() signIn: SignInDto) {
    return this.authService.signIn(signIn);
  }

  @Post('reset-password')
  resetPassword(@Body() email: ResetPasswordDto) {
    return this.authService.resetPassword(email);
  }

  @Post('verify-code')
  verifyCode(@Body() body: { email: string; verificationCode: string }) {
    return this.authService.verifyCode(body);
  }

  @Post('update-password')
  updatePassword(@Body() body: ChangePasswordDto) {
    return this.authService.updatePassword(body);
  }
}
