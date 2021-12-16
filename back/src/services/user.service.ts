import { TagModel, UserModel } from "@src/models";
import { makeVerifyKey } from "@src/utils/mailAuth";
import { IUserDocument, IUserData } from "@src/types/User";
import { ICreateUser } from "@src/types/CoreResponse";

export class UserService {
  constructor(
    private readonly userModel: typeof UserModel,
    private readonly tagModel: typeof TagModel,
  ) {}

  async createUser(data: IUserData): Promise<ICreateUser> {
    try {
      const user = await this.userModel.findOne({ email: data.email });

      if (user) return { status: false, message: "이미 가입된 이메일입니다." };

      const { tags } = data;

      const result = await Promise.all(
        tags.map((tag: string) => this.tagModel.findOrCreate({ content: tag })),
      );

      const keyForVerify = makeVerifyKey();

      const createUserData = {
        ...data,
        tags: result,
        keyForVerify,
        emailVerified: false,
      };

      await this.userModel.hashPassword(createUserData);

      await this.userModel.create(createUserData);
      return { status: true, keyForVerify };
    } catch (err: any) {
      return { status: false, message: err.message };
    }
  }

  async getByEmail(email: string): Promise<IUserDocument | null> {
    return this.userModel.findOne({ email }, { shortId: 1, password: 1, email: 1 });
  }

  async getById(id: string, obj = {}): Promise<IUserDocument | null> {
    return this.userModel.findById(id, { password: 0, ...obj });
  }

  async updateEmailVerified(key: string) {
    return await this.userModel.updateOne({ keyForVerify: key }, { emailVerified: true });
  }

  async updateRefreshToken(id: string, refreshToken: string | null) {
    await this.userModel.updateOne({ _id: id }, { refreshToken });
  }
}

export const userService = new UserService(UserModel, TagModel);
