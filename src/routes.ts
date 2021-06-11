import express from "express";
import UserController from "./controllers/UserController";
import PlaneController from "./controllers/PlaneController";
import DestinationController from "./controllers/DestinationController";
import TicketController from "./controllers/TicketController";
import CompanyController from "./controllers/CompanyController";

const routes = express.Router();
const userController = new UserController();
const planeController = new PlaneController();
const destinationController = new DestinationController();
const ticketController = new TicketController();
const companyController = new CompanyController();

routes.get("/user", userController.read);
routes.get("/plane", planeController.read);
routes.get("/destination", destinationController.read);
routes.get("/ticket", ticketController.read);
routes.get("/company", companyController.read);

routes.post("/user", userController.create);
routes.post("/plane", planeController.create);
routes.post("/destination", destinationController.create);
routes.post("/ticket", ticketController.create);
routes.post("/company", companyController.create);

routes.put("/user", userController.update);
routes.put("/plane", planeController.update);
routes.put("/destination", destinationController.update);
routes.put("/company", companyController.update);
routes.put("/company_add", companyController.add);
routes.put("/company_remove", companyController.remove);

routes.delete("/user", userController.delete);
routes.delete("/plane", planeController.delete);
routes.delete("/destination", destinationController.delete);
routes.delete("/ticket", ticketController.delete);
routes.delete("/company", companyController.delete);

export default routes;
