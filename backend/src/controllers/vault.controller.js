import Vault from "../models/vault.model.js";
import TrustedContact from "../models/trustedContacts.model.js";
import { encryptContent, decryptContent } from "../utils/encryption.js";

// CREATE
export const createVault = async (req, res) => {
    try {
        const { title, content, category, trustedContacts, isPrivate, releaseAfterDays } = req.body;

        if (!title || !content) {
            return res.status(400).json({ message: "Title and content are required." });
        }

        // Validate trusted contacts belong to user
        const validContacts = await TrustedContact.find({
            _id: { $in: trustedContacts },
            owner: req.user._id,
        });

        if (validContacts.length !== trustedContacts.length) {
            return res.status(400).json({ message: "Invalid or unauthorized trusted contacts." });
        }

        const encrypted = encryptContent(content);

        const newVault = await Vault.create({
            user: req.user._id,
            title,
            content: encrypted,
            category,
            trustedContacts: validContacts.map((c) => c._id),
            isPrivate,
            releaseAfterDays,
            lastConfirmedAt: new Date(),
        });

        res.status(201).json({ message: "Vault created", vault: newVault });
    } catch (err) {
        console.error("Vault create error:", err);
        res.status(500).json({ message: "Server error" });
    }
};

// READ - All Vaults
export const getVaults = async (req, res) => {
    try {
        const vaults = await Vault.find({ user: req.user._id });
        const decryptedVaults = vaults.map((vault) => ({
            ...vault._doc,
            content: decryptContent(vault.content),
        }));
        res.status(200).json(decryptedVaults);
    } catch (err) {
        console.error("Get vaults error:", err);
        res.status(500).json({ message: "Server error" });
    }
};

// READ - Single Vault
export const getVaultById = async (req, res) => {
    try {
        const vault = await Vault.findOne({ _id: req.params.id, user: req.user._id });
        if (!vault) return res.status(404).json({ message: "Vault not found" });

        const decryptedContent = decryptContent(vault.content);
        res.status(200).json({ ...vault._doc, content: decryptedContent });
    } catch (err) {
        console.error("Get vault by ID error:", err);
        res.status(500).json({ message: "Server error" });
    }
};

// UPDATE
export const updateVault = async (req, res) => {
    try {
        const { title, content, category, isPrivate, releaseAfterDays } = req.body;

        const vault = await Vault.findOne({ _id: req.params.id, user: req.user._id });
        if (!vault) return res.status(404).json({ message: "Vault not found" });

        if (title) vault.title = title;
        if (content) vault.content = encryptContent(content);
        if (category) vault.category = category;
        if (isPrivate !== undefined) vault.isPrivate = isPrivate;
        if (releaseAfterDays !== undefined) vault.releaseAfterDays = releaseAfterDays;

        await vault.save();
        res.status(200).json({ message: "Vault updated", vault });
    } catch (err) {
        console.error("Update vault error:", err);
        res.status(500).json({ message: "Server error" });
    }
};

// DELETE
export const deleteVault = async (req, res) => {
    try {
        const vault = await Vault.findOneAndDelete({ _id: req.params.id, user: req.user._id });
        if (!vault) return res.status(404).json({ message: "Vault not found" });

        res.status(200).json({ message: "Vault deleted" });
    } catch (err) {
        console.error("Delete vault error:", err);
        res.status(500).json({ message: "Server error" });
    }
};
//681ce22c7513f441d016e305
//681ce27805c91e1057d00eff