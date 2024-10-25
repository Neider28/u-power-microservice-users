import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { OAuth2Client } from 'google-auth-library';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  private client = new OAuth2Client(process.env.CLIENT_ID);

  constructor(
    private jwtService: JwtService,
    private usersService: UsersService,
  ) {}

  async validateGoogleToken(token: string) {
    const ticket = await this.client.verifyIdToken({
      idToken: token,
      audience: process.env.CLIENT_ID,
    });

    const payload = ticket.getPayload();
    return payload;
  }

  async loginWithGoogle(token: string) {
    const payload = await this.validateGoogleToken(token);
    if (!payload) {
      throw new Error('Invalid token!');
    }

    const newUser = await this.usersService.create({
      picture: payload.picture,
      name: payload.name,
      googleId: payload.sub,
      email: payload.email,
    });

    const user = {
      email: newUser.email,
      sub: newUser._id,
      role: newUser.role,
    };
    return {
      access_token: this.jwtService.sign(user),
    };
  }

  async profile(id: string) {
    return await this.usersService.findOneById(id);
  }
}
