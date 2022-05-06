import { User } from "@prisma/client";
export declare class RouteProvider {
    onLogin(user: User): string;
}
