import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, ManyToOne, JoinTable, OneToMany, BeforeInsert, BeforeUpdate } from 'typeorm';
import { Materia } from '../../../../materias/entities/materia.entity';
import { Semestre } from 'src/Sistema_A/semestres/entities/semestre.entity';
import { Carrera } from 'src/Sistema_A/carreras/entities/carrera.entity';
import { AtencionEstudiante } from 'src/Sistema_A/atenciones/entities/atencione.entity';
import { hash } from 'bcrypt';
import { Role } from 'src/Sistema_A/roles/entities/role.entity';

@Entity('docente')
export class Docente {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', length: 100 })
  nombre: string;

  @Column({ type: 'varchar', length: 100 })
  apellido: string;

  @Column({ type: 'varchar', length: 100, unique: true })
  email: string;
  @Column({type: 'varchar', nullable: false})
  password: string;
  // Relación con Materias
  @ManyToMany(() => Materia, (materia) => materia.docentes)
  materias: Materia[];

  @ManyToOne(() => Carrera, (carrera) => carrera.docentes, { nullable: true })
  carrera: Carrera;

  // Relación con Semestre (Opcional, Muchos a Muchos)
  @ManyToMany(() => Semestre, (semestre) => semestre.docentes)
  @JoinTable({
    name: 'docente_semestre',
    joinColumn: { name: 'docente_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'semestre_id', referencedColumnName: 'id' },
  })
  semestres: Semestre[];


  @OneToMany(() => AtencionEstudiante, (atencionEstudiante) => atencionEstudiante.docente)
atencionesEstudiantes: AtencionEstudiante[];

 @ManyToMany(type => Role, rol => rol.Docente, {eager: true})
    @JoinTable({
        name: 'doocente_rol',
        joinColumn: {name: 'Docente_id'},
        inverseJoinColumn: {name: 'rol_id'}
    })
    roles: Role[];

    @BeforeInsert()
    @BeforeUpdate()
    async hashPasword() {
        if(!this.password) return;
        this.password = await hash(this.password, 10);
    }

}
