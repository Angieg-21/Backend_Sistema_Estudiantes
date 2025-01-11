import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToMany,
    JoinTable,
    OneToMany,
  } from 'typeorm';
  import { Semestre } from '../../semestres/entities/semestre.entity';
import { Materia } from 'src/Sistema_A/materias/entities/materia.entity';
import { Estudiante } from 'src/Sistema_A/usuarios/components/estudiantes/entities/estudiante.entity';
import { Docente } from 'src/Sistema_A/usuarios/components/docentes/entities/docente.entity';
  
  @Entity('carrera')
  export class Carrera {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ type: 'varchar', length: 100 })
    nombre: string;
  
    @Column({ type: 'text', nullable: true })
    descripcion: string;
  
    // Relación Muchos a Muchos con Semestre
    @ManyToMany(() => Semestre, (semestre) => semestre.carreras)
    @JoinTable({
      name: 'carrera_semestre', // Nombre de la tabla intermedia
      joinColumn: {
        name: 'carrera_id',
        referencedColumnName: 'id',
      },
      inverseJoinColumn: {
        name: 'semestre_id',
        referencedColumnName: 'id',
      },
    })
    semestres: Semestre[];

    @OneToMany(() => Materia, (materia) => materia.carrera)
  materias: Materia[];

  @OneToMany(() => Estudiante, (estudiante) => estudiante.carrera)
  estudiantes: Estudiante[];

  @OneToMany(() => Docente, (docente) => docente.carrera)
  docentes: Docente[];
  }
  