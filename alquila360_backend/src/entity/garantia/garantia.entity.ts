import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';
//import { Contrato } from '../contrato/contrato.entity'; (esta linea se activa despues de crear la entidad contrato)

@Entity('garantia')
export class Garantia {
    @PrimaryGeneratedColumn()
    id_garantia: number;

    // Campo numérico para el dinero
    @Column({ type: 'decimal', precision: 10, scale: 2 })
    monto: number; 

    @Column({ type: 'varchar', length: 255 })
    descripcion: string;

    // Relación OneToOne con Contrato. La FK estará en la tabla Contrato.
    @OneToOne(() => Contrato, (contrato) => contrato.garantia)
    contrato: Contrato;
}