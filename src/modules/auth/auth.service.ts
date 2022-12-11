import { Injectable } from "@nestjs/common";

@Injectable()
export class AuthService{

    constructor() {
        
    }

    signup() {
        return {msg: "signup"};
    }

    signin() {
        return {msg: "signin"};
    }
}