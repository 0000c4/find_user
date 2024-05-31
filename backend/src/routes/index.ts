import { Application } from "express";
import UserRoutes from "./users.routes";

export default class Routes {
  constructor(app: Application) {
    app.use("/api/users", UserRoutes);
  }
}
