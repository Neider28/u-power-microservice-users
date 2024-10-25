import { Controller } from '@nestjs/common';
import { UsersService } from './users.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UserMSG } from 'src/common/constants';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @MessagePattern(UserMSG.UPDATE)
  update(@Payload() payload: any) {
    return this.usersService.update(payload.id, payload.updateUserDto);
  }

  @MessagePattern(UserMSG.FIND_STUDENTS)
  findStudents() {
    return this.usersService.findStudents();
  }
}
