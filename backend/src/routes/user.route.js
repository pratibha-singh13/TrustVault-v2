import express from "express";
import { getUserDashboard } from "../controllers/user.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

// GET user dashboard data (vaults, trusted contacts, profile)
router.get("/dashboard", protectRoute, getUserDashboard);

export default router;
