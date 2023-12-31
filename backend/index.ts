import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import cookieParser from "cookie-parser";

import { authRouter, postPublicRouter, userRouter } from "./routes";

const app = express();
dotenv.config();

app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);
app.use(cookieParser());
app.use(cors({ origin: true, credentials: true }));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

app.use("/auth", authRouter);
app.use("/user", userRouter);
app.use("/post", postPublicRouter);

app.listen(8080, () => {
  console.log("Server listen on port 8080");
});
