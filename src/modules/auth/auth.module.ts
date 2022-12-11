import { Module } from "@nestjs/common";
import { RequestModule } from "../request/request.module";
import { RequestService } from "../request/request.service";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";


@Module({
    imports: [
        
    ],
    controllers: [AuthController],
    providers: [AuthService]
})
export class AuthModule{}