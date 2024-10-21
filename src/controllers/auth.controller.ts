import { JsonController, Post, Body } from "routing-controllers";
import { AuthService } from "../services/auth.service";
import { Student } from "../entities/student.entity";
import { Service } from "typedi";

@Service()
@JsonController("/auth")
export class AuthController {
  private authService: AuthService = new AuthService();

  @Post("/register")
  async register(@Body() studentData: Partial<Student>) {
    return await this.authService.register(studentData);
  }

  @Post("/login")
  async login(
    @Body() { email, password }: { email: string; password: string }
  ) {
    return await this.authService.login(email, password);
  }
}
