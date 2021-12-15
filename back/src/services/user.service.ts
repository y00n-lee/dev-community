import { Tag, User } from "@src/models";
import { IUserDocument, IUserData } from "@src/types/User";
import { ICoreResponse } from "@src/types/CoreResponse";

export class UserService {
  constructor(private readonly userModel: typeof User, private readonly tagModel: typeof Tag) {}

  async createUser(data: IUserData): Promise<ICoreResponse> {
    try {
      const user = await this.userModel.findOne({ email: data.email });

      if (user) return { status: false, message: "이미 가입된 이메일입니다." };

      const { tags } = data;

      const result = await Promise.all(
        tags.map((tag: string) => this.tagModel.findOrCreate({ content: tag })),
      );

      const createUserData = {
        ...data,
        tags: result,
      };

      await this.userModel.hashPassword(createUserData);

      await this.userModel.create(createUserData);
      return { status: true };
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

  async updateRefreshToken(id: string, refreshToken: string | null) {
    await this.userModel.updateOne({ _id: id }, { refreshToken });
  }
}

export const userService = new UserService(User, Tag);
