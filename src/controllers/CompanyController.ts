import { Response, Request } from "express";
import Company from "../models/CompanyModel";
import Plane from "../models/PlaneModel";

class CompanyController {
  async create(req: Request, res: Response) {
    const { company, cnpj } = req.body;
    try {
      let isCompany = await Company.findOne({ cnpj });

      if (!isCompany) {
        isCompany = await Company.create({
          company,
          cnpj,
        });
        return res.status(201).json({ message: "company registered!" });
      } else {
        return res.status(409).json({ message: "company already registered!" });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "500 sever error" }); //500 sever error
    }
  }

  async read(req: Request, res: Response) {
    const { cnpj } = req.body;
    try {
      let isCompany = await Company.findOne({ cnpj });

      if (isCompany) {
        let length = isCompany.planes.length;
        return res.status(200).json({
          company: isCompany.get("company"),
          cnpj: isCompany.get("cnpj"),
          numberPlanes: length,
          planes: isCompany.get("planes"),
        });
      } else {
        return res.status(404).json({ message: "company not found!" });
      }
    } catch (error) {
      return res.status(500).json({ error: "500 sever error" }); //500 sever error
    }
  }

  async delete(req: Request, res: Response) {
    const { cnpj } = req.body;
    try {
      let isCompany = await Company.findOne({ cnpj });
      if (isCompany) {
        await Company.deleteOne({ cnpj });
        return res.status(200).json({ message: "cnpj deleted" });
      } else {
        return res.status(404).json({ message: "cnpj not found" });
      }
    } catch (error) {
      return res.status(500).json({ error: "500 sever error" }); //500 sever error
    }
  }

  async add(req: Request, res: Response) {
    const { cnpj, _id } = req.body;
    try {
      let isCompany = await Company.findOne({ cnpj });
      let isPlane = await Plane.findOne({ _id });
      if (isCompany) {
        if (isPlane) {
          await Company.findOneAndUpdate(
            { cnpj },
            { $push: { planes: isPlane._id } }
          );
          await Plane.findOneAndUpdate({ _id }, { companyId: isCompany._id });
          return res.status(200).json({ message: "aircraft added" });
        } else {
          return res.status(404).json({ message: "aircraft not found" });
        }
      } else {
        return res.status(404).json({ message: "company not found" });
      }
    } catch (error) {
      return res.status(500).json({ error: "500 sever error" });
    }
  }

  async remove(req: Request, res: Response) {
    const { cnpj, _id } = req.body;
    try {
      let isCompany = await Company.findOne({ cnpj });
      let isPlane = await Plane.findOne({ _id });
      if (isCompany) {
        if (isPlane) {
          await Company.findOneAndUpdate(
            { cnpj },
            { $pull: { planes: isPlane._id } }
          );
          await Plane.findOneAndUpdate({ _id }, { company: null });
          return res.status(200).json({ message: "aircraft removed" });
        } else {
          return res.status(404).json({ message: "aircraft not found" });
        }
      } else {
        return res.status(404).json({ message: "company not found" });
      }
    } catch (error) {
      return res.status(500).json({ error: "500 sever error" });
    }
  }

  async update(req: Request, res: Response) {
    const { company, cnpj } = await req.body;
    try {
      let isCompany = await Company.findOne({ cnpj });
      if (isCompany) {
        await Company.findOneAndUpdate(
          { cnpj },
          {
            company,
            cnpj,
          }
        );
        return res.status(200).json({ message: "company updated" });
      } else {
        return res.status(404).json({ message: "company not found" });
      }
    } catch (error) {
      return res.status(500).json({ error: "500 sever error" });
    }
  }
}
export default CompanyController;
