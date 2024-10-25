import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      isGlobal: true,
    }),
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
    }),
    UsersModule,
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
