import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { UserI } from 'src/interfaces/user.interface';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(createUserDto: CreateUserDto): Promise<UserI> {
    const verifyUser = await this.findOneByEmail(createUserDto.email);
    if (verifyUser) return verifyUser;

    const newUser = new this.userModel(createUserDto);

    return await newUser.save();
  }

  async findOneByEmail(email: string): Promise<UserI> {
    const user = await this.userModel.findOne({ email });

    return user;
  }

  async findOneById(id: string): Promise<User> {
    const user = await this.userModel.findById(id);

    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const existingUser = await this.userModel.findOne({
      personalId: updateUserDto.personalId,
    });

    if (existingUser) {
      throw new Error('El personalId ya está en uso por otro usuario.');
    }

    const user = this.userModel.findOneAndUpdate(
      { googleId: id },
      updateUserDto,
      {
        new: true,
        returnDocument: 'after',
      },
    );

    return user;
  }

  async findStudents(): Promise<User[]> {
    return this.userModel.find({ role: 'student' });
  }
}
