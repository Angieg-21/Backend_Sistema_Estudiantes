import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    ManyToMany,
    JoinTable,
    OneToMany,
    BeforeInsert,
    BeforeUpdate,
  } from 'typeorm';
  import { Carrera } from '../../../../carreras/entities/carrera.entity';
  import { Semestre } from './../../../../semestres/entities/semestre.entity';
  import { Materia } from './../../../../materias/entities/materia.entity';
import { AtencionEstudiante } from 'src/Sistema_A/atenciones/entities/atencione.entity';
import { hash } from 'bcrypt';
import { Role } from 'src/Sistema_A/roles/entities/role.entity';
  
  @Entity('estudiante')
  export class Estudiante {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ type: 'varchar', length: 100 })
    nombres: string;
  
    @Column({ type: 'varchar', length: 100 })
    apellidos: string;
  
    @Column({ type: 'varchar', length: 10, unique: true })
    cedula: string;
  
    @Column({ type: 'date', nullable: true })
    fechaNacimiento: Date;
  
    @Column({ type: 'varchar', length: 100, unique: true })
    email: string;

    @Column({type: 'varchar', nullable: false})
  password: string;
  
    @Column({ type: 'varchar', length: 20 })
    telefono: string;
  
    @Column({ type: 'date', nullable: true })
    fechaIngreso: Date;

     @ManyToMany(type => Role, rol => rol.Estudiante, {eager: true})
        @JoinTable({
            name: 'estudiante_rol',
            joinColumn: {name: 'estudiante_id'},
            inverseJoinColumn: {name: 'rol_id'}
        })
        roles: Role[];
    
        @BeforeInsert()
        @BeforeUpdate()
        async hashPasword() {
            if(!this.password) return;
            this.password = await hash(this.password, 10);
        }
    
  
    // Relación con Carrera (Muchos a Uno)
    @ManyToOne(() => Carrera, (carrera) => carrera.estudiantes, { nullable: false })
    carrera: Carrera;
  
    // Relación con Semestre (Muchos a Uno)
    @ManyToOne(() => Semestre, (semestre) => semestre.estudiantes, { nullable: false })
    semestre: Semestre;
  
    // Relación con Materias (Muchos a Muchos, Opcional)
    @ManyToMany(() => Materia, (materia) => materia.estudiantes)
    @JoinTable({
      name: 'estudiante_materia',
      joinColumn: { name: 'estudiante_id', referencedColumnName: 'id' },
      inverseJoinColumn: { name: 'materia_id', referencedColumnName: 'id' },
    })
    materias: Materia[];

    @OneToMany(() => AtencionEstudiante, (atencionEstudiante) => atencionEstudiante.estudiante)
atencionesEstudiantes: AtencionEstudiante[];

  }
  