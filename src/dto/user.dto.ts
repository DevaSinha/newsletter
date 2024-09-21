import { ApiProperty } from "@nestjs/swagger";
import { Organization } from "src/entity/organization.entity";
import { UserRole } from "src/utils/roles";

export class userResponseDto {
    id: string;
    email: string;
    role: UserRole;
    organization: Organization;
}

export class RegisterDto {
    @ApiProperty({ example: 'user', description: 'Name of the user' })
    readonly name: string;
    @ApiProperty({ example: 'user@example.com', description: 'Email of the user' })
    readonly email: string;
    @ApiProperty({ example: 'password', description: 'Password of the user' })
    readonly password: string;
    @ApiProperty({ example: 'User', description: 'Role of the user' })
    readonly role?: UserRole;
}

export class LoginDto {
    @ApiProperty({ example: 'user@example.com', description: 'Email of the user' })
    readonly email: string;
    @ApiProperty({ example: 'password', description: 'Password of the user' })
    readonly password: string;
}
