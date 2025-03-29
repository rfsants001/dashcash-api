import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { SigninDto } from './dto/signin.dto';
import { UsersRepository } from 'src/shared/database/repositories/users.repositories';
import { compare, hash } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { SignupDto } from './dto/signup.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersRepo: UsersRepository,
    private readonly jwtService: JwtService,
  ) {}
  async signin(signinDto: SigninDto) {
    const { email, password } = signinDto;
    const user = await this.usersRepo.findUnique({
      where: { email },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const token = await this.generateToken(user.id);
    return { token };
  }

  async signup(signupDto: SignupDto) {
    const { name, password, email } = signupDto;
    const emailTaken = await this.usersRepo.findUnique({
      where: { email },
      select: { id: true },
    });

    if (emailTaken) {
      throw new ConflictException('Email already in use');
    }

    const hashedPassword = await hash(password, 12);

    const user = await this.usersRepo.create({
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

    const token = this.generateToken(user.id);
    return { token };
  }

  private async generateToken(userId: string) {
    const token = await this.jwtService.signAsync({ sub: userId });
    return token;
  }
}
