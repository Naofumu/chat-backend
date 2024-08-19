import { BadRequestException, Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as argon2 from 'argon2'
import { JwtService } from '@nestjs/jwt';
import { IUser } from 'src/types/types';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) {}

  async validateUser(username: string, password: string) {
    const user = await this.userService.findOne(username);
    const passwordIsMatch = await argon2.verify(user.password, password)

    if (user && passwordIsMatch) {
      return user;
    }
    throw new BadRequestException('User or password are incorrect')
  }

  async login(user: IUser) {
    const { id, username } = user
    return {
      id, username, token: this.jwtService.sign({id: user.id, username: user.username})
    };
}
}
