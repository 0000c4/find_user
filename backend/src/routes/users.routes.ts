import { Router } from "express";
import UsersController from "../controllers/users.controller";

class UserRoutes {
  router = Router();
  controller = new UsersController();

  constructor() {
    this.intializeRoutes();
  }

  intializeRoutes() {
    // Retrieve all Tutorials
    this.router.post("/", this.controller.findAll);
  }
}

export default new UserRoutes().router;
