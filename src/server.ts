import express from "express";
import routes from "./routes";
import mongoose from "mongoose";
import morgan from "morgan";

const server = express();
const MONGO_PASSWORD = process.env.MONGO_PASSWORD;
mongoose.connect(
  `mongodb+srv://caiocamilo:${MONGO_PASSWORD}@clustertreino.sxswe.mongodb.net/ticket?retryWrites=true&w=majority`,
  { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }
);
mongoose.set("useCreateIndex", true);

server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(morgan("dev"));
server.use(routes);

server.listen(3000);
