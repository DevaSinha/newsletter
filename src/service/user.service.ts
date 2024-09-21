import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entity/user.entity';
import { UserRole } from 'src/utils/roles';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { RegisterDto, userResponseDto } from 'src/dto/user.dto';
import { userNotFoundException } from 'src/exceptions/user.exception';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {}

    private readonly saltRounds = 10;

    async addUser(registerDto: RegisterDto): Promise<User> {
        const hashedPassword = await this.hashPassword(registerDto.password);

        const user = this.userRepository.create({
            email: registerDto.email,
            password_hash: hashedPassword,
            role: registerDto.role ?? UserRole.USER,
        });

        return this.userRepository.save(user);
    }

    async findByEmail(email: string) {
        const user = (await this.userRepository.findOne({ where: { email } })) ?? null;

        if (!user) {
            throw new userNotFoundException('User not found');
        }

        return user;
    }

    async getUser(id: string): Promise<userResponseDto> {
        const user = await this.userRepository.findOne({
            where: { id },
        });

        if (!user) {
            throw new userNotFoundException('User Not Found');
        }

        const { email, organization, role } = user;
        return {
            email,
            organization: organization ?? null,
            role,
            id: user.id,
        } as userResponseDto;
    }

    async comparePassword(enteredPassword: string, storedHash: string): Promise<boolean> {
        return bcrypt.compare(enteredPassword, storedHash);
    }

    private async hashPassword(password: string): Promise<string> {
        return bcrypt.hash(password, this.saltRounds);
    }
}
