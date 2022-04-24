import {Injectable} from "@nestjs/common";

@Injectable({})
export class AuthService {
    register() {
        return {message: 'I am registered'};
    }
    login() {
        return {message: 'I am logged in'};
    }
}