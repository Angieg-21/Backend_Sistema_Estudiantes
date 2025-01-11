import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, OneToMany } from 'typeorm';
import { Carrera } from '../../carreras/entities/carrera.entity';
import { Materia } from 'src/Sistema_A/materias/entities/materia.entity';
import { Estudiante } from 'src/Sistema_A/usuarios/components/estudiantes/entities/estudiante.entity';
import { Docente } from 'src/Sistema_A/usuarios/components/docentes/entities/docente.entity';

@Entity('semestre')
export class Semestre {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  numero: number;

  @Column({ type: 'text', nullable: true })
  descripcion: string;

  // Relación Muchos a Muchos con Carrera
  @ManyToMany(() => Carrera, (carrera) => carrera.semestres)
  carreras: Carrera[];

  @OneToMany(() => Materia, (materia) => materia.semestre)
  materias: Materia[];
  @OneToMany(() => Estudiante, (estudiante) => estudiante.semestre)
  estudiantes: Estudiante[];

  @ManyToMany(() => Docente, (docente) => docente.semestres)
  docentes: Docente[];
}
