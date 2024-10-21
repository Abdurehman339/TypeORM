import {
  JsonController,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  UseBefore,
  Authorized,
} from "routing-controllers";
import { Inject, Service } from "typedi";
import { StudentService } from "../services/student.service";
import { Student } from "../entities/student.entity";

@Service()
@JsonController("/students")
export class StudentController {
  @Inject()
  private studentService: StudentService;

  @Authorized()
  @Post()
  async create(@Body() data: Partial<Student>) {
    return this.studentService.createStudent(data);
  }

  @Authorized()
  @Get()
  async getAll() {
    return this.studentService.getAllStudents();
  }

  @Authorized()
  @Get("/:id")
  async getOne(@Param("id") id: number) {
    return this.studentService.getStudentById(id);
  }

  @Authorized()
  @Put("/:id")
  async update(@Param("id") id: number, @Body() data: Partial<Student>) {
    return this.studentService.updateStudent(id, data);
  }

  @Authorized()
  @Delete("/:id")
  async delete(@Param("id") id: number) {
    await this.studentService.deleteStudent(id);
    return { message: "Student deleted" };
  }

  @Authorized()
  @Post("/:studentId/courses/:courseId/select")
  async selectCourse(
    @Param("studentId") studentId: number,
    @Param("courseId") courseId: number
  ) {
    console.log("hello");
    return this.studentService.selectCourse(studentId, courseId);
  }

  @Authorized()
  @Post("/:studentId/courses/:courseId/deselect")
  async deselectCourse(
    @Param("studentId") studentId: number,
    @Param("courseId") courseId: number
  ) {
    return this.studentService.deselectCourse(studentId, courseId);
  }
}
