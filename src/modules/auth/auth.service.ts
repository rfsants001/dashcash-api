import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { SigninDto } from './dto/signin.dto.';
import { SignupDto } from './dto/signup.dto';
import { UserRepository } from 'src/shared/database/repository/user.repository';
import { JwtService } from '@nestjs/jwt';
import { compare, hash } from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepo: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async signin(createAuthDto: SigninDto) {
    const { email, password } = createAuthDto;
    const user = await this.userRepo.findUnique({
      where: { email },
    });

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const isPasswordValid = await compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password');
    }

    const token = await this.generateToken(user.id);

    return {
      token,
    };
  }

  async signup(createAuthDto: SignupDto) {
    const { name, email, password } = createAuthDto;

    if (!email || !password) {
      throw new Error('Email and password are required');
    }

    const emailExists = await this.userRepo.findUnique({
      where: { email },
      select: { id: true },
    });

    if (emailExists) {
      throw new BadRequestException('Email already exists');
    }

    const hashedPassword = await hash(password, 10);

    const user = await this.userRepo.create({
      data: {
        name,
        email,
        password: hashedPassword,
        categories: {
          createMany: {
            data: [
              { name: 'Salário', icon: 'travel', type: 'INCOME' },
              { name: 'Freelance', icon: 'work', type: 'INCOME' },
              { name: 'Outro', icon: 'other', type: 'INCOME' },
              { name: 'Casa', icon: 'home', type: 'EXPENSE' },
              { name: 'Alimentação', icon: 'food', type: 'EXPENSE' },
              { name: 'Educação', icon: 'education', type: 'EXPENSE' },
              { name: 'Lazer', icon: 'fun', type: 'EXPENSE' },
              { name: 'Mercado', icon: 'grocery', type: 'EXPENSE' },
              { name: 'Roupas', icon: 'clothes', type: 'EXPENSE' },
              { name: 'Transporte', icon: 'transport', type: 'EXPENSE' },
              { name: 'Viajem', icon: 'travel', type: 'EXPENSE' },
            ],
          },
        },
      },
    });

    const token = await this.generateToken(user.id);

    return {
      token,
    };
  }

  private async generateToken(userId: string) {
    const token = await this.jwtService.signAsync(
      { sub: userId },
      { expiresIn: '1h' },
    );

    return token;
  }
}
