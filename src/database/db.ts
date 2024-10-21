import { AppDataSource } from "./data-source";

export default class DatabaseLoader {
  public static async Load(): Promise<void> {
    console.log("Connection Loading...");
    AppDataSource.initialize()
      .then(() => {
        console.log("Data Source has been initialized!");
      })
      .catch((error) =>
        console.error("Error during Data Source initialization", error)
      );
  }
}
