import { Request, Response } from "express"; //filtra o q n usa chama apenas o re res do express
import User from "../models/UserModel";

class UserController {
  async create(req: Request, res: Response) {
    const { nome, email, idade, sexo } = req.body;

    try {
      let isUser = await User.findOne({ email });

      if (!isUser) {
        isUser = await User.create({
          nome,
          email,
          idade,
          sexo,
          dataCadastro: new Date(),
        });
        return res.status(201).json({ message: "Usiario cairdo!" });
      } else {
        return res.status(409).json({ message: "Usiario ja tme!" });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json("500 sever error"); //500 sever error
    }
  }

  async read(req: Request, res: Response) {
    const { email } = req.body;
    try {
      let isUser = await User.findOne({ email });
      if (isUser) {
        return res.status(200).json({
          nome: isUser.get("nome"),
          email: isUser.get("email"),
          idade: isUser.get("idade"),
          sexo: isUser.get("sexo"),
        });
      } else {
        return res.status(404).json({ message: "Usuário não existe!" });
      }
    } catch (error) {
      return res.status(500).json("500 sever error"); //500 sever error
    }
  }

  async delete(req: Request, res: Response) {
    const { email } = req.body;
    try {
      let isUser = await User.findOne({ email });
      if (isUser) {
        await User.deleteOne({ email });
        return res.status(200).json({ message: "Usuario deletado" });
      } else {
        return res.status(404).json({ message: "Usuario não existe" });
      }
    } catch (error) {
      return res.status(500).json({ error: "500 sever error" }); //500 sever error
    }
  }

  async update(req: Request, res: Response) {
    const { nome, email, idade, sexo } = req.body;
    try {
      let isUser = await User.findOne({ email });
      if (isUser) {
        await User.updateOne({ email }, { nome, idade, sexo });
        return res
          .status(200)
          .json({ message: "Usuario atualizado com sucesso" });
      } else {
        return res.status(404).json({ message: "Usuario não existe" });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "500 sever error" }); //500 sever error
    }
  }
}

export default UserController;
