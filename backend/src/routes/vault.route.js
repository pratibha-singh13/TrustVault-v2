import express from "express";
import {
    createVault,
    getVaults,
    getVaultById,
    updateVault,
    deleteVault,
} from "../controllers/vault.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

// Vault CRUD
router.post("/", protectRoute, createVault);
router.get("/", protectRoute, getVaults);
router.get("/:id", protectRoute, getVaultById);
router.put("/:id", protectRoute, updateVault);
router.delete("/:id", protectRoute, deleteVault);

export default router;
