import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";

const generateAccessToken = (user: any) => {
  const accessToken = jwt.sign(
    {
      user,
    },
    "daylakeymahoaaccessToken",
    {
      expiresIn: "120s",
    }
  );
  return accessToken;
};
const generateRefreshToken = (user: any) => {
  const refreshToken = jwt.sign(
    {
      user,
    },
    "daylakeymahoarefreshToken",
    {
      expiresIn: "10days",
    }
  );
  return refreshToken;
};
const requestRefreshToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const refreshToken = req.cookies.refreshToken as string;
    if (!refreshToken) {
      return res.status(401).json("Token not authenticated");
    }
    jwt.verify(refreshToken, "daylakeymahoarefreshToken", (err, user) => {
      if (err) {
        res.end();
      }
      const newAccessToken = generateAccessToken(user);
      const newRefreshToken = generateRefreshToken(user);
      res.cookie("refreshToken", newRefreshToken, {
        httpOnly: true,
        secure: false,
        path: "/",
        sameSite: "lax",
      });
      return res.status(200).json({ accessToken: newAccessToken });
    });
  } catch(err : any) {
    next(err)
  }
};

export { generateAccessToken, generateRefreshToken, requestRefreshToken };
