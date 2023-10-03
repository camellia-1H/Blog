import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
// import * as bcrypt from "bcrypt";
import { generateAccessToken, generateRefreshToken } from "./token";

const prisma = new PrismaClient();

const authController = {
  register: async (req: Request, res: Response) => {
    try {
      const { email } = req.body;
      let existUser = await prisma.user.findUnique({
        where: {
          email,
        },
      });

      if (existUser) {
        throw Error("User da duoc dang ki");
      }

      // const hashPassword = await bcrypt.hash(
      //   password,
      //  10
      // );

      const newUser = await prisma.user.create({
        data: {
          ...req.body,
        },
      });
      res.status(201).json(newUser);
    } catch (error) {
      // throw Error("khong the dang ki user");
      console.log(error);
    }
  },
  login: async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
      let existUser = await prisma.user.findUnique({
        where: {
          email,
        },
      });
      if (existUser) {
        const accessToken = generateAccessToken(existUser);
        const refreshToken = generateRefreshToken(existUser);

        // const isMatch = await bcrypt.compare(password, existUser.password);
        if (password == existUser.password) {
          res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: false,
            path: "/",
            sameSite: "strict",
          });
          return res.status(200).json({ ...existUser, accessToken });
        } else {
          res.status(400).json("Sai email hoac password ");
        }
      } else {
        res.status(400).json("Sai email hoac password ");
      }
    } catch (error) {
      return res.json(error);
    }
  },
  logout: async (req: Request, res: Response) => {
    res.clearCookie('refreshToken')
    res.status(200).json('Log out successfully')
  },

  
};
export default authController;
