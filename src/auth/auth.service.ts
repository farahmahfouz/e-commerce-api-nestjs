import { Body, HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { ChangePasswordDto, ResetPasswordDto, SignInDto, SignUpDto } from './dto/auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/user/user.schema';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class AuthService {
  constructor(@InjectModel(User.name) private userModel: Model<User>, private jwtService: JwtService, private mailService: MailerService) { }

  async signUp(createAuthDto: SignUpDto) {
    const user = await this.userModel.findOne({ email: createAuthDto.email });

    if (user) {
      throw new HttpException('User already exists', 400);;
    }

    const newUser = await this.userModel.create(createAuthDto);
    const payload = { _id: newUser._id, role: newUser.role };
    const token = this.jwtService.sign(payload, { secret: process.env.JWT_SECRET_KEY });

    return {
      status: 'success',
      message: 'User created successfully',
      token,
      data: { user: newUser },
    }

  }

  async signIn(signInDto: SignInDto) {
    const { email, password } = signInDto;

    if (!email || !password) {
      throw new HttpException('Email and password are required', 400);
    }

    const user = await this.userModel.findOne({ email }).select('+password');
    if (!user || !(await (user as any).correctPassword(password, user.password))) {
      throw new HttpException('Invalid email or password', 401);
    }
    const payload = { _id: user._id, role: user.role };
    const token = this.jwtService.sign(payload, { secret: process.env.JWT_SECRET_KEY });

    return {
      status: 'success',
      message: 'User signed in successfully',
      token,
      data: { user },
    };
  }

  async resetPassword(resetPasswordDto: ResetPasswordDto) {
    const { email } = resetPasswordDto;
    const user = await this.userModel.findOne({ email });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const code = Math.floor(100000 + Math.random() * 900000).toString().padStart(6, '0');
    await this.userModel.findOneAndUpdate({ email }, { verificationCode: code }, { new: true });

    const htmlMessage =
      `<div>
        <p>Forgot your password? If you didn't forget your password, please ignore this email! </p>
        <p>Use the following codeto verify your account: <h3 style="color: red">${code}</h3></p>
       </div>`

    this.mailService.sendMail({
      from: `Farah Mahfouz <${process.env.EMAIL_FROM}>`,
      to: email,
      subject: `Reset Password`,
      html: htmlMessage,
    });

    return {
      status: 'success',
      message: `Verification code sent to email (${email})`,
    }

  }

  async verifyCode({ email, verificationCode }: { email: string, verificationCode: string }) {
    const user = await this.userModel.findOne({ email }).select('+verificationCode');

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (user.verificationCode !== verificationCode) {
      throw new HttpException('Invalid verification code', 400);
    }

    await this.userModel.findOneAndUpdate({ email }, { verificationCode: null }, { new: true });

    return {
      status: 'success',
      message: 'Verification code is valid',
    }
  }

  async updatePassword({ password, email }: ChangePasswordDto) {
    const user = await this.userModel.findOne({ email });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    user.password = password;
    await user.save();
    return {
      status: 'success',
      message: 'Password updated successfully',
    }
  }
}
