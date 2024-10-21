import { Course } from "../entities/course.entity";
import { AppDataSource } from "../database/data-source";
import { Service } from "typedi";

@Service()
export class CourseService {
  private courseRepo = AppDataSource.getRepository(Course);

  async createCourse(courseData: Partial<Course>) {
    const course = this.courseRepo.create(courseData);
    return await this.courseRepo.save(course);
  }

  async deleteCourse(courseId: number) {
    const course = await this.courseRepo.findOne({ where: { id: courseId } });
    if (!course) {
      throw new Error("Course not found");
    }
    await this.courseRepo.remove(course);
    return { message: "Course deleted successfully" };
  }

  async getCourseWithStudents(courseId: number) {
    const course = await this.courseRepo.findOne({
      where: { id: courseId },
      relations: ["students"],
    });
    if (!course) {
      throw new Error("Course not found");
    }
    return course;
  }
}
