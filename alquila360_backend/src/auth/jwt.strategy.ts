import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'super_secreto_cambia_esto',
    });
  }

  async validate(payload: any) {
    // Esto queda disponible como req.user en controladores protegidos
    return {
      id_usuario: payload.sub,
      correo: payload.correo,
      tipo_usuario: payload.tipo_usuario,
    };
  }
}
