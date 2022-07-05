import { User } from "@prisma/client";
import { UserChangeSettingDto } from "./dto/user.change-setting.dto";
import { UserRepository } from "./user.repository";
import { UserSettingService } from "./user.setting.service";
export declare class UserController {
    private readonly userRepository;
    private readonly userSettingService;
    constructor(userRepository: UserRepository, userSettingService: UserSettingService);
    getMe(user: User): Promise<User>;
    changeSetting(user: User, dto: UserChangeSettingDto): Promise<void>;
}
