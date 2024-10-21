import "reflect-metadata";
import {
  Action,
  createExpressServer,
  UnauthorizedError,
  useContainer,
} from "routing-controllers";
import { StudentController } from "./controllers/student.controller";
import DatabaseLoader from "./database/db";
import { Container } from "typedi";
import { CourseController } from "./controllers/course.controller";
import { AuthController } from "./controllers/auth.controller";
import * as jwt from "jsonwebtoken";

export const startApp = async () => {
  useContainer(Container);
  await DatabaseLoader.Load();

  const app = createExpressServer({
    controllers: [StudentController, CourseController, AuthController],
    authorizationChecker: async (action: Action): Promise<boolean> => {
      const req = action.request; // Get the request object from the action
      const token = req.headers["authorization"];

      console.log("before");

      // If no token is provided, return false (Unauthorized)
      if (!token) {
        return false;
      }

      console.log("after");

      try {
        const decoded = jwt.verify(token, "your-secret-key");
        req.user = decoded; // Attach the decoded user info to the request
        return true; // Authorization success
      } catch (error) {
        return false; // Invalid token
      }
    },
  });

  app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
  });
};
