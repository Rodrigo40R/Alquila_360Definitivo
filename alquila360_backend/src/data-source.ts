// src/data-source.ts
import 'dotenv/config';
import { DataSource } from 'typeorm';

import { User } from './entity/user.entity';
import { Propietario } from './entity/propietario.entity';
import { Inquilino } from './entity/inquilino.entity';
import { Tecnico } from './entity/tecnico.entity';
import { Administrador } from './entity/administrador.entity';
import { Propiedad } from './entity/propiedad.entity';
import { Ticket } from './entity/ticket.entity';
import { Garantia } from './entity/garantia.entity';
import { Contrato } from './entity/contrato.entity';
import { Reporte } from './entity/reporte.entity';
import { Evaluacion } from './entity/evaluacion.entity';
import { Multa } from './entity/multa.entity';
import { Cuota } from './entity/cuota.entity';
import { Pago } from './entity/pago.entity';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [
    User,
    Propietario,
    Inquilino,
    Tecnico,
    Administrador,
    Propiedad,
    Ticket,
    Garantia,
    Contrato,
    Reporte,
    Evaluacion,
    Multa,
    Cuota,
    Pago,
  ],
  synchronize: false,
  logging: true,
});

export default AppDataSource;
