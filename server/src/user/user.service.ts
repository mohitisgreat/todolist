import {
  Injectable,
  BadRequestException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';
import { User } from './user.model';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private UserModel: Model<User>) {}

  async signUp(
    firstName: string,
    lastName: string,
    email: string,
    password: string,
  ) {
    if (!(firstName && lastName && email && password)) {
      throw new BadRequestException('Required fields are not provided');
    }

    const newUser = new this.UserModel({
      firstName,
      lastName,
      email,

      /**
       * !!WARNING!!: Don't store password directly into the database,
       * use encrypted stuff for storing password!!!!!
       */
      password,
    });

    try {
      const result = await newUser.save();

      // Don't wanna return the password;
      return {
        firstName: result.firstName,
        lastName: result.lastName,
        email: result.email,
      };
    } catch (e) {
      throw new InternalServerErrorException('Signup failed');
    }
  }

  async tryLogin(email: string, password: string) {
    if (!(email && password)) {
      throw new BadRequestException('Required fields are not provided');
    }

    try {
      // TODO: improve the login method a little bit.
      const user = await this.UserModel.findOne({ email, password });
      return {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      };
    } catch (e) {
      // Unable to login
      throw new NotFoundException('Invalid credentials');
    }
  }
}
