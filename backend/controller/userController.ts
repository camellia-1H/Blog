import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

const userController = {
  getProfile: async (req: Request, res: Response) => {
    const { userid } = req.params;

    try {
      const userInfo = await prisma.user.findUnique({
        where: {
          id : userid,
        },
      });
      return res.status(200).json(userInfo);
    } catch (error) {
      return res.json("khong the tim thay user");
    }
  },
};

export default userController;
