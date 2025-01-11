import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    ManyToMany,
    JoinTable,
  } from 'typeorm';
  import { Carrera } from '../../carreras/entities/carrera.entity';
  import { Semestre } from '../../semestres/entities/semestre.entity';
  import { Docente } from '../../usuarios/components/docentes/entities/docente.entity';
import { Estudiante } from 'src/Sistema_A/usuarios/components/estudiantes/entities/estudiante.entity';
  
  @Entity('materia')
  export class Materia {
    @PrimaryGeneratedColumn('increment')
    id: number;
  
    @Column({ type: 'varchar', length: 100 })
    nombre: string;
  
    @Column({ type: 'text', nullable: true })
    descripcion: string;
  
    // Relación con Carrera (Muchos a Uno)
    @ManyToOne(() => Carrera, (carrera) => carrera.materias, { nullable: false })
    carrera: Carrera;
  
    // Relación con Semestre (Muchos a Uno)
    @ManyToOne(() => Semestre, (semestre) => semestre.materias, { nullable: false })
    semestre: Semestre;
  
    // Relación con Docente (Muchos a Muchos)
    @ManyToMany(() => Docente, (docente) => docente.materias)
    @JoinTable({
      name: 'docente_materia',
      joinColumn: { name: 'materia_id', referencedColumnName: 'id' },
      inverseJoinColumn: { name: 'docente_id', referencedColumnName: 'id' },
    })
    docentes: Docente[];

    @ManyToMany(() => Estudiante, (estudiante) => estudiante.materias)
  estudiantes: Estudiante[];
  }
  