import { DataSource } from "typeorm";
import { Student } from "../entities/student.entity";
import { Course } from "../entities/course.entity";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "Passwordp-1",
  database: "View Once",
  entities: [Student, Course],
  synchronize: true,
});
