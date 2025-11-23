import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { LoginDto } from './dto/login.dto';
import { User } from '../entity/user.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(dto: LoginDto): Promise<User> {
    const users = await this.userService.findAll();

    const user = users.find(
      (u) =>
        u.correo === dto.correo &&
        u.password === dto.password &&
        u.tipo_usuario === dto.tipo_usuario,
    );

    if (!user) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    return user;
  }

  async login(dto: LoginDto) {
    const user = await this.validateUser(dto);

    const payload = {
      sub: user.id_usuario,
      tipo_usuario: user.tipo_usuario,
      correo: user.correo,
    };

    const access_token = await this.jwtService.signAsync(payload);

    return {
      access_token,
      user,
    };
  }
}
