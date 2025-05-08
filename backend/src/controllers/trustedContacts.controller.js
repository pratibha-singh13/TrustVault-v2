import TrustedContact from "../models/trustedContacts.model.js";

// CREATE - Add a trusted contact
export const addTrustedContact = async (req, res) => {
    try {
        const { contactName, contactEmail, phone } = req.body;

        if (!contactName || !contactEmail || !phone) {
            return res.status(400).json({ message: "All fields are required." });
        }

        const newContact = await TrustedContact.create({
            contactName,
            contactEmail,
            phone,
            owner: req.user._id
        });

        res.status(201).json({ message: "Trusted contact added.", contact: newContact });
    } catch (err) {
        console.error("Add trusted contact error:", err);
        res.status(500).json({ message: "Failed to add trusted contact." });
    }
};

// READ - Get all trusted contacts for a user
export const getTrustedContacts = async (req, res) => {
    try {
        const contacts = await TrustedContact.find({ owner: req.user._id });
        res.status(200).json(contacts);
    } catch (err) {
        console.error("Get trusted contacts error:", err);
        res.status(500).json({ message: "Failed to fetch trusted contacts." });
    }
};

// UPDATE - Update a trusted contact
export const updateTrustedContact = async (req, res) => {
    try {
        const { id } = req.params;
        const { contactName, contactEmail, phone } = req.body;

        const contact = await TrustedContact.findOneAndUpdate(
            { _id: id, owner: req.user._id },
            { contactName, contactEmail, phone },
            { new: true }
        );

        if (!contact) {
            return res.status(404).json({ message: "Trusted contact not found." });
        }

        res.status(200).json({ message: "Trusted contact updated.", contact });
    } catch (err) {
        console.error("Update trusted contact error:", err);
        res.status(500).json({ message: "Failed to update trusted contact." });
    }
};

// DELETE - Remove a trusted contact
export const deleteTrustedContact = async (req, res) => {
    try {
        const { id } = req.params;

        const contact = await TrustedContact.findOneAndDelete({ _id: id, owner: req.user._id });

        if (!contact) {
            return res.status(404).json({ message: "Trusted contact not found." });
        }

        res.status(200).json({ message: "Trusted contact deleted." });
    } catch (err) {
        console.error("Delete trusted contact error:", err);
        res.status(500).json({ message: "Failed to delete trusted contact." });
    }
};
