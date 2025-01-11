import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Column } from 'typeorm';
import { Docente } from '../../usuarios/components/docentes/entities/docente.entity';
import { Estudiante } from '../../usuarios/components/estudiantes/entities/estudiante.entity';

@Entity()
export class AtencionEstudiante {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Docente, (docente) => docente.atencionesEstudiantes)
  @JoinColumn({ name: 'docenteId' })
  docente: Docente;

  @ManyToOne(() => Estudiante, (estudiante) => estudiante.atencionesEstudiantes)
  @JoinColumn({ name: 'estudianteId' })
  estudiante: Estudiante;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  fechaAtencion: Date;

  @Column({ type: 'varchar', length: 255 })
  tipoConsulta: string; // Ejemplo: "Revisión de tesis", "Consulta académica", etc.

  @Column({ type: 'text' })
  descripcion: string; // Descripción de lo que se atendió

  @Column({ type: 'boolean', default: false })
  atendido: boolean; // Indica si la consulta fue atendida o está pendiente
}

