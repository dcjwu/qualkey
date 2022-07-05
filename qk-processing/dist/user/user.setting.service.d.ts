import { User } from "@prisma/client";
import { PrismaService } from "../prisma/prisma.service";
import { UserChangeSettingDto } from "./dto/user.change-setting.dto";
export declare class UserSettingService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    changeUserSetting(user: User, dto: UserChangeSettingDto): Promise<void>;
    private changeCurrency;
}
