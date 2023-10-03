import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import cookieParser from "cookie-parser"

import { authRouter, userRouter } from "./routes";

const app = express();
dotenv.config();

app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  }),
);
app.use(cookieParser())
app.use(cors());

app.use("/auth", authRouter);
app.use("/user",userRouter);


app.listen(8080, () => {
  console.log("Server listen on port 8080");
});
