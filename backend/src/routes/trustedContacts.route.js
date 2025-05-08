import express from "express";
import {
    addTrustedContact,
    getTrustedContacts,
    updateTrustedContact,
    deleteTrustedContact,
} from "../controllers/trustedContacts.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

// Trusted Contacts CRUD
router.post("/", protectRoute, addTrustedContact);
router.get("/", protectRoute, getTrustedContacts);
router.put("/:id", protectRoute, updateTrustedContact);
router.delete("/:id", protectRoute, deleteTrustedContact);

export default router;
