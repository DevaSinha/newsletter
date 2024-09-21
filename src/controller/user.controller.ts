import {
    Controller,
    Post,
    Get,
    Body,
    Param,
    HttpCode,
    HttpStatus,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoginDto, RegisterDto } from 'src/dto/user.dto';
import { AuthService, JwtToken } from 'src/service/auth.service';
import { UserService } from 'src/service/user.service';

@Controller('api/users')
@ApiTags('User Controller')
export class UserController {
    constructor(
        private readonly userService: UserService,
        private readonly authService: AuthService,
    ) {}

    @Post('register')
    @ApiOperation({ summary: 'Register a new user' })
    @ApiResponse({ status: 201, description: 'User registered successfully' })
    @ApiResponse({ status: 400, description: 'Invalid input' })
    @HttpCode(HttpStatus.CREATED)
    async register(@Body() registerDto: RegisterDto) {
        return this.userService.addUser(registerDto);
    }

    @Post('login')
    @ApiOperation({ summary: 'Log in' })
    @ApiResponse({ status: 200, description: 'User logged in successfully' })
    @ApiResponse({ status: 403, description: 'Unauthorised user' })
    @HttpCode(HttpStatus.OK)
    async login(@Body() loginDto: LoginDto): Promise<JwtToken> {
        return this.authService.login(loginDto);
    }

    @Get(':id')
    @ApiOperation({ summary: 'Find user by id' })
    @ApiResponse({ status: 200, description: 'Fetched user successfully' })
    @ApiResponse({ status: 404, description: 'User not found' })
    @HttpCode(HttpStatus.OK)
    async getUserById(@Param('id') id: string) {
        return this.userService.getUser(id);
    }
}
