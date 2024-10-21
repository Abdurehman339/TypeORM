import { Service } from "typedi";
import { Student } from "../entities/student.entity";
import { Course } from "../entities/course.entity";
import { AppDataSource } from "../database/data-source";

@Service()
export class StudentService {
  private studentRepository = AppDataSource.getRepository(Student);
  private courseRepository = AppDataSource.getRepository(Course);

  async createStudent(data: Partial<Student>): Promise<Student> {
    const newStudent = this.studentRepository.create(data);
    return this.studentRepository.save(newStudent);
  }

  async getAllStudents(): Promise<Student[]> {
    return this.studentRepository.find({ relations: ["courses"] });
  }

  async getStudentById(id: number): Promise<Student | null> {
    return this.studentRepository.findOne({
      where: { id },
      relations: ["courses"],
    });
  }

  async updateStudent(
    id: number,
    data: Partial<Student>
  ): Promise<Student | undefined> {
    const student = await this.getStudentById(id);
    if (!student) return undefined;
    this.studentRepository.merge(student, data);
    return this.studentRepository.save(student);
  }

  async deleteStudent(id: number): Promise<void> {
    const student = await this.getStudentById(id);
    if (student) {
      await this.studentRepository.remove(student);
    }
  }

  async selectCourse(
    studentId: number,
    courseId: number
  ): Promise<Student | undefined> {
    const student = await this.getStudentById(studentId);
    const course = await this.courseRepository.findOne({
      where: { id: courseId },
    });

    if (student && course) {
      student.courses.push(course);
      return this.studentRepository.save(student);
    }
    return undefined;
  }

  async deselectCourse(
    studentId: number,
    courseId: number
  ): Promise<Student | undefined> {
    const student = await this.getStudentById(studentId);
    if (student) {
      student.courses = student.courses.filter(
        (course) => course.id !== courseId
      );
      return this.studentRepository.save(student);
    }
    return undefined;
  }
}
