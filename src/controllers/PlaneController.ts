import { Response, Request } from "express";
import Plane from "../models/PlaneModel";

class PlaneController {
  async create(req: Request, res: Response) {
    const { weight, prefix, manufacturer, dateFabrication, passengerNumber } =
      req.body;
    try {
      let isPlane = await Plane.findOne({ prefix });

      if (!isPlane) {
        isPlane = await Plane.create({
          weight,
          prefix,
          manufacturer,
          dateFabrication,
          passengerNumber,
        });
        return res.status(201).json({ message: "aircraft registered!" });
      } else {
        return res
          .status(409)
          .json({ message: "aircraft already registered!" });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "500 sever error" }); //500 sever error
    }
  }

  async read(req: Request, res: Response) {
    const { prefix } = req.body;
    try {
      let isPlane = await Plane.findOne({ prefix });
      if (isPlane) {
        return res.status(200).json({
          weight: isPlane.get("weight"),
          prefix: isPlane.get("prefix"),
          manufacturer: isPlane.get("manufacturer"),
          dateFabrication: isPlane.get("dateFabrication"),
          passengerNumber: isPlane.get("passengerNumber"),
          _id: isPlane.get("_id"),
          companyId: isPlane.get("companyId"),
        });
      } else {
        return res.status(404).json({ message: "Aircraft not found!" });
      }
    } catch (error) {
      return res.status(500).json({ error: "500 sever error" }); //500 sever error
    }
  }

  async delete(req: Request, res: Response) {
    const { prefix } = req.body;
    try {
      let isPlane = await Plane.findOne({ prefix });
      if (isPlane) {
        await Plane.deleteOne({ prefix });
        return res.status(200).json({ message: "aircraft deleted" });
      } else {
        return res.status(404).json({ message: "aircraft not found" });
      }
    } catch (error) {
      return res.status(500).json({ error: "500 sever error" }); //500 sever error
    }
  }

  async update(req: Request, res: Response) {
    const { weight, prefix, manufacturer, dateFabrication, passengerNumber } =
      req.body;
    try {
      let isPlane = await Plane.findOne({ prefix });
      if (isPlane) {
        await Plane.findOneAndUpdate(
          { prefix },
          { weight, manufacturer, dateFabrication, passengerNumber }
        );
        return res.status(200).json({ message: "aircraft updated" });
      } else {
        return res.status(404).json({ message: "aircraft not found" });
      }
    } catch (error) {
      return res.status(500).json({ error: "500 sever error" });
    }
  }
}
export default PlaneController;
