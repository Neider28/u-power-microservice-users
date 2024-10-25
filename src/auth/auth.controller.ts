import { Controller } from '@nestjs/common';
import { AuthService } from './auth.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AuthMSG } from 'src/common/constants';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern(AuthMSG.LOGIN_GOOGLE)
  loginWithGoogle(@Payload() payload: string) {
    return this.authService.loginWithGoogle(payload);
  }

  @MessagePattern(AuthMSG.PROFILE)
  profile(@Payload() payload: string) {
    return this.authService.profile(payload);
  }
}
