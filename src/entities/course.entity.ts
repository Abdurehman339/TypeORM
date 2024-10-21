import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from "typeorm";
import { Student } from "./student.entity";

@Entity()
export class Course {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @ManyToMany(() => Student, (student) => student.courses)
  students: Student[];
}
