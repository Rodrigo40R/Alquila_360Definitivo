// src/entity/contrato/contrato.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

// NOTA: Estas importaciones pueden mostrar errores hasta que crees los archivos correspondientes.
//import { Propiedad } from '../propiedad/propiedad.entity';
//import { Propietario } from '../user/propietario.entity';
//import { Inquilino } from '../user/inquilino.entity';
import { Garantia } from '../garantia/garantia.entity';
//import { Cuota } from '../cuota/cuota.entity'; 
//import { Multa } from '../multa/multa.entity'; 

@Entity('contrato')
export class Contrato {
  @PrimaryGeneratedColumn()
  id_contrato: number;

  @Column({ type: 'date' })
  fecha_inicio: Date; // date

  @Column({ type: 'date' })
  fecha_fin: Date; // date

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  monto_mensual: number; // decimal

  @Column({ type: 'varchar', length: 50, default: 'Activo' })
  estado: string; // string

  @Column({ type: 'boolean', default: false })
  renovable: boolean; // Implementación del método 'renovar()'
  
  // --- RELACIONES ManyToOne (Claves Foráneas explícitas) ---

  // 1. Relación con Propiedad (Un contrato es para una propiedad)
  // Aunque es 1:1 en el diagrama, se modela mejor con ManyToOne si una propiedad pudiera tener varios contratos a lo largo del tiempo, pero siempre uno activo. 
  // Si la FK la lleva Contrato, es JoinColumn
  @OneToOne(() => Propiedad, (propiedad) => propiedad.contrato)
  @JoinColumn({ name: 'id_propiedad' }) 
  propiedad: Propiedad;

  // 2. Contrato con Propietario (Un contrato es firmado por un propietario)
  @ManyToOne(() => Propietario, (propietario) => propietario.contratosFirmados)
  @JoinColumn({ name: 'id_propietario' })
  propietario: Propietario;

  // 3. Contrato con Inquilino (Un contrato es alquilado por un inquilino)
  @ManyToOne(() => Inquilino, (inquilino) => inquilino.contratosAlquilados)
  @JoinColumn({ name: 'id_inquilino' })
  inquilino: Inquilino;
  
  // --- RELACIÓN OneToOne (Garantia) ---

  // 4. Contrato tiene una Garantia
  // El JoinColumn va aquí porque Contrato es el lado que tiene la FK (id_garantia) en la base de datos
  @OneToOne(() => Garantia, (garantia) => garantia.contrato)
  @JoinColumn({ name: 'id_garantia' }) 
  garantia: Garantia;

  // --- RELACIONES OneToMany ---

  // 5. Contrato genera muchas Cuotas
  @OneToMany(() => Cuota, (cuota) => cuota.contrato)
  cuotas: Cuota[];

  // 6. Contrato puede tener muchas Multas
  @OneToMany(() => Multa, (multa) => multa.contrato)
  multasAsociadas: Multa[];
}