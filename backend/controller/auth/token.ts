import jwt from "jsonwebtoken";
import { Request, Response } from "express";

const generateAccessToken = (user: any) => {
  const accessToken = jwt.sign(
    {
      user,
    },
    "daylakeymahoaaccessToken",
    {
      expiresIn: "60s",
    },
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
    },
  );
  return refreshToken;
};
const requestRefreshToken = async (req: Request, res: Response) => {
  const refreshToken = req.cookies.refreshToken as string;
  if (!refreshToken) {
    return res.status(401).json("Token not authenticated");
  }
  jwt.verify(refreshToken, "daylakeymahoarefreshToken", (err, user) => {
    if (err) {
      res.end()
    }
    const newAccessToken = generateAccessToken(user);
    const newRefreshToken = generateRefreshToken(user);
    res.cookie("refreshToken", newRefreshToken, {
      httpOnly: true,
      secure: false,
      path: "/",
      sameSite: "strict",
    });
    return res.status(200).json({accessToken : newAccessToken})
  });
};

export { generateAccessToken, generateRefreshToken, requestRefreshToken };
