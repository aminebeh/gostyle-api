import {
  BadRequestException,
  Body,
  Controller,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from '../guards/local-auth.guard';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { UserService } from '../user/user.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Request() req: any) {
    return this.authService.login(req.user);
  }

  @Post('register')
  async register(@Body() user: CreateUserDto) {
    const userExist = await this.userService.findBy([
      {
        username: user.username,
      },
      {
        email: user.email,
      },
    ]);

    if (userExist) {
      throw new BadRequestException('Username / Email already used');
    }

    return this.userService.create(user);
  }
}
