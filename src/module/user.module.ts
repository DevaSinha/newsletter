import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserController } from "src/controller/user.controller";
import { User } from "src/entity/user.entity";
import { UserService } from "src/service/user.service";
import { AuthModule } from "./auth.module";
import { AuthService } from "src/service/auth.service";
import { JwtService } from "@nestjs/jwt";


@Module({
  imports: [
    TypeOrmModule.forFeature([User] ),
  ],
  providers: [UserService, AuthService, JwtService],
  exports: [UserService],
  controllers: [UserController],
})
export class UserModule {}