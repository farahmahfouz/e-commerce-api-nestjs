import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ChangePasswordDto, ResetPasswordDto, SignInDto, SignUpDto } from './dto/auth.dto';

@Controller('api/v1/auth')
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
