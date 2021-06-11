import { Response, Request } from "express";
import Company from "../models/CompanyModel";
import User from "../models/UserModel";
import Destination from "../models/DestinationModel";
import Ticket from "../models/TicketModel";
import Plane from "../models/PlaneModel";

class TicketController {
  async create(req: Request, res: Response) {
    const { email, prefix, airportCode, number } = req.body;
    try {
      let isTicket = await Ticket.findOne({ number });
      let isCompany = await Company.findOne({ prefix });
      let isUser = await User.findOne({ email });
      let isDestination = await Destination.findOne({ airportCode });
      if (!isTicket) {
        if (isCompany) {
          if (isUser) {
            if (isDestination) {
              await Ticket.create({
                passenger: isUser._id,
                destination: isDestination,
                provider: isCompany,
                dateBuy: new Date(),
                number: number,
              });
              return res.status(201).json({ message: "ticket created!" });
            } else {
              return res.status(404).json({ message: "destination not found" });
            }
          } else {
            return res.status(404).json({ message: "user not found" });
          }
        } else {
          return res.status(404).json({ message: "Company not found" });
        }
      } else {
        return res.status(409).json({ message: "ticket already exists" });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "500 sever error" });
    }
  }

  async read(req: Request, res: Response) {
    const { number } = req.body;
    try {
      let isTicket = await Ticket.findOne({ number });
      if (isTicket) {
        return res.status(200).json({
          passenger: isTicket.get("passenger"),
          destination: isTicket.get("destination"),
          provider: isTicket.get("provider"),
          dateBuy: isTicket.get("dateBuy"),
          number: isTicket.get("number"),
        });
      } else {
        return res.status(404).json({ message: "Ticket not found!" });
      }
    } catch (error) {
      return res.status(500).json({ error: "500 sever error" }); //500 sever error
    }
  }

  async delete(req: Request, res: Response) {
    const { number } = req.body;
    try {
      let isTicket = await Ticket.findOne({ number });
      if (isTicket) {
        await Ticket.deleteOne({ number });
        return res.status(200).json({ message: "ticket deleted" });
      } else {
        return res.status(404).json({ message: "ticket not found" });
      }
    } catch (error) {
      return res.status(500).json({ error: "500 sever error" }); //500 sever error
    }
  }
}

export default TicketController;
