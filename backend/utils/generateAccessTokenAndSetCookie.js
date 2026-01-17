import jwt from "jsonwebtoken";

export const generateAccessTokenAndSetCookie = (res, userId) => {
  const access_token = jwt.sign({ userId }, process.env.JWT_SECRET_KEY, {
    expiresIn: "7d",
  });
  res.cookie("access_token", access_token, {
    httpOnly: true,
    secret: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });

  return access_token;
};
