import { Response, Request } from "express";
import Destination from "../models/DestinationModel";

class DestinationController {
  async create(req: Request, res: Response) {
    const { city, airportCode, state, country } = req.body;
    try {
      let isDestination = await Destination.findOne({ airportCode });

      if (!isDestination) {
        isDestination = await Destination.create({
          city,
          airportCode,
          state,
          country,
        });
        return res.status(201).json({ message: "Destination registered!" });
      } else {
        return res
          .status(409)
          .json({ message: "Destination already registered!" });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "500 sever error" }); //500 sever error
    }
  }

  async read(req: Request, res: Response) {
    const { airportCode } = req.body;
    try {
      let isDestination = await Destination.findOne({ airportCode });
      if (isDestination) {
        return res.status(200).json({
          city: isDestination.get("city"),
          airportCode: isDestination.get("airportCode"),
          state: isDestination.get("state"),
          country: isDestination.get("country"),
        });
      } else {
        return res.status(404).json({ message: "destination not found!" });
      }
    } catch (error) {
      return res.status(500).json({ error: "500 sever error" }); //500 sever error
    }
  }

  async delete(req: Request, res: Response) {
    const { airportCode } = req.body;
    try {
      let isDestination = await Destination.findOne({ airportCode });
      if (isDestination) {
        await Destination.deleteOne({ airportCode });
        return res.status(200).json({ message: "destination deleted" });
      } else {
        return res.status(404).json({ message: "destination not found" });
      }
    } catch (error) {
      return res.status(500).json({ error: "500 sever error" }); //500 sever error
    }
  }

  async update(req: Request, res: Response) {
    const { city, airportCode, state, country } = await req.body;
    try {
      let isDestination = await Destination.findOne({ airportCode });
      if (isDestination) {
        await Destination.findOneAndUpdate(
          { airportCode },
          {
            city,
            airportCode,
            state,
            country,
          }
        );
        return res.status(200).json({ message: "destination updated" });
      } else {
        return res.status(404).json({ message: "destination not found" });
      }
    } catch (error) {
      return res.status(500).json({ error: "500 sever error" });
    }
  }
}
export default DestinationController;
