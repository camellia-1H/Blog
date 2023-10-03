import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;
  const refreshToken = req.cookies.refreshToken as string;
  if (token) {
    const accessToken = token.split(" ")[1];
    jwt.verify(accessToken, "daylakeymahoaaccessToken", (err) => {
      if (err) {
        return res.status(403).json("Token not valid or expired");
        // jwt.verify(refreshToken, "daylakeymahoarefreshToken", (err, user) => {
        //   if (err) {
        //     res.end();
        //   }
        //   const newAccessToken = generateAccessToken(user);
        //   const newRefreshToken = generateRefreshToken(user);
        //   res.cookie("refreshToken", newRefreshToken, {
        //     httpOnly: true,
        //     secure: false,
        //     path: "/",
        //     sameSite: "strict",
        //   });
        //   return newAccessToken
        // });
      } else {
        next();
      }
    });
  } else {
    res.status(401).json("Token not authenticated");
  }
};

const verifyTokenAndAuthorization = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  verifyToken(req, res, async () => {
    const { id, userid } = req.params;
    const result = await prisma.post.findUnique({
      where: {
       id
      },
    });

    if (result?.authorId == req.params.userid) {
      next();
    } else {
      return res.status(403).json("You not allow to do");
    }
  });
};

export { verifyToken, verifyTokenAndAuthorization };
