import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user/entities/user.entity';
import { CreateUserDto } from '../user/dto/create-user.dto';

export interface IJwtTokenPaylaod {
  sub: string | number;
  username: string;
  iat?: number;
  exp?: number;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string) {
    //const user = await this.userService.findByUsername(username);
    const user = await this.userService.findBy([
      {
        username: username,
      },
      {
        email: username,
      },
    ]);
    const passwordMatch = await this.userService.comparePassword(user, pass);
    if (user && passwordMatch) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload: IJwtTokenPaylaod = {
      username: user.username,
      sub: user.id,
      iat: Date.now(),
    };
    return {
      acess_token: this.jwtService.sign(payload),
    };
  }
}
