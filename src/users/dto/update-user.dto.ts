import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateUserDto {
  @IsNotEmpty()
  @IsString()
  readonly personalId: string;
}
