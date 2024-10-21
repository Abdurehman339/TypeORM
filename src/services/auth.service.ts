import { Service } from "typedi";
import { AppDataSource } from "../database/data-source";
import { Student } from "../entities/student.entity";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";

@Service()
export class AuthService {
  private studentRepo = AppDataSource.getRepository(Student);

  async register(studentData: Partial<Student>) {
    const existingStudent = await this.studentRepo.findOne({
      where: { email: studentData.email },
    });

    if (existingStudent) {
      throw new Error("Email already in use.");
    }

    if (!studentData.password) {
      throw new Error("Password is required.");
    }

    const hashedPassword = bcrypt.hashSync(studentData.password, 10);
    const newStudent = this.studentRepo.create({
      ...studentData,
      password: hashedPassword,
    });

    await this.studentRepo.save(newStudent);

    // Generate a JWT token after registration
    const token = this.generateToken(newStudent.id);

    return { student: newStudent, token };
  }

  async login(email: string, password: string) {
    const student = await this.studentRepo.findOne({
      where: { email },
    });

    if (!student) {
      throw new Error("Invalid credentials.");
    }

    const isPasswordValid = await bcrypt.compare(password, student.password);

    if (!isPasswordValid) {
      throw new Error("Invalid credentials.");
    }

    // Generate a JWT token on successful login
    const token = this.generateToken(student.id);

    return { student, token };
  }

  private generateToken(studentId: number) {
    const secretKey = process.env.JWT_SECRET || "your-secret-key";
    const expiresIn = "1h"; // Token expiration time

    return jwt.sign({ id: studentId }, secretKey, { expiresIn });
  }
}
