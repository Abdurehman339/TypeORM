import {
  JsonController,
  Post,
  Body,
  Get,
  Param,
  Delete,
  UseBefore,
  Authorized,
} from "routing-controllers";
import { CourseService } from "../services/course.service";
import { Course } from "../entities/course.entity";
import { Service } from "typedi";

@Service()
@JsonController("/courses")
export class CourseController {
  private courseService: CourseService = new CourseService();

  @Authorized()
  @Post("/")
  async createCourse(@Body() courseData: Partial<Course>) {
    return await this.courseService.createCourse(courseData);
  }

  @Authorized()
  @Delete("/:id")
  async deleteCourse(@Param("id") courseId: number) {
    return await this.courseService.deleteCourse(courseId);
  }

  @Authorized()
  @Get("/:id")
  async getCourseWithStudents(@Param("id") courseId: number) {
    return await this.courseService.getCourseWithStudents(courseId);
  }
}
