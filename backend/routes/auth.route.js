import express from "express";
import {
  forgotPassword,
  login,
  logout,
  signup,
  verifyEmail,
  resetPassword,
} from "../controllers/auth.controller.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.post("/verify-email", verifyEmail);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);
router.get("/check-auth", verifyToken, (req, res) => {
  res.status(200).json({ user: req.user });
});

export default router;
