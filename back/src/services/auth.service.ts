import { userService, UserService } from "./user.service";
import JwtService from "jsonwebtoken";
import { jwtContents } from "@src/utils/constants";
import { encryptValue } from "@src/utils/crypto";
import { ITokenUser } from "@src/types/User";

export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: typeof JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.userService.getByEmail(email);

    const isCompare = await user?.comparePassword(password);

    if (!user) return { message: "유저가 존재하지 않습니다." };
    if (!isCompare) return { message: "비밀번호가 틀립니다." };

    return { user: await this.userService.getById(user.id) };
  }

  async signin(payload: ITokenUser) {
    const accessToken = this.jwtService.sign(payload, jwtContents.secret, {
      expiresIn: "5m",
    });

    const refreshToken = this.jwtService.sign(payload, jwtContents.secret, {
      expiresIn: "14d",
    });

    await this.userService.updateRefreshToken(payload.id, refreshToken);
    return encryptValue(accessToken);
  }

  async verifyRefresh(payload: ITokenUser) {
    const user = await this.userService.getById(payload.id);

    if (!user) return false;

    return user.verifyRefresh();
  }
}

export const authService = new AuthService(userService, JwtService);
