import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import * as bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UsersService } from "src/users/users.service";
import { authUserDto } from "./dto/authUserDto";

@Injectable()
export class AuthService {
  constructor(private userService: UsersService) {}

  async registerUser(dto: authUserDto) {
    const candidate = await this.userService.findOneByEmail(dto.email);

    if (candidate) {
      throw new HttpException(
        "User with this email already exist",
        HttpStatus.BAD_REQUEST,
      );
    }

    const hash = await bcrypt.hash(dto.password, 10);

    const newUser = await this.userService.create({
      email: dto.email,
      password: hash,
    });

    return {
      message: "User successful created",
      newUser,
    };
  }

  async loginUser(dto: authUserDto) {
    const candidate = await this.userService.findOneByEmail(dto.email);

    if (!candidate) {
      throw new HttpException(
        "User with this email doesn't exist",
        HttpStatus.BAD_REQUEST,
      );
    }

    const matched = await bcrypt.compare(dto.password, candidate.password);

    if (!matched) {
      throw new HttpException("Invalid password", HttpStatus.NOT_FOUND);
    }

    const token = jwt.sign(
      {
        id: candidate.id,
        email: candidate.email,
        password: candidate.password,
      },
      "secret-key",
    );

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...userData } = candidate;

    return {
      token,
      ...userData,
    };
  }

  async getCurrentUser(id: number) {
    const currentUser = await this.userService.findUserById(id);
    return { currentUser };
  }
}
