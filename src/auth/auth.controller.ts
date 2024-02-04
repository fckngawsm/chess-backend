import { Body, Controller, Post, Req, UseGuards } from "@nestjs/common";
import { AuthGuard } from "./auth.guard";
import { AuthService } from "./auth.service";
import { authUserDto } from "./dto/authUserDto";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("sign-up")
  register(@Body() dto: authUserDto) {
    return this.authService.registerUser(dto);
  }

  @Post("sign-in")
  login(@Body() dto: authUserDto) {
    return this.authService.loginUser(dto);
  }

  @Post("me")
  @UseGuards(AuthGuard)
  getMe(@Req() req) {
    const user = req.user;
    return this.authService.getCurrentUser(user.id);
  }
}
