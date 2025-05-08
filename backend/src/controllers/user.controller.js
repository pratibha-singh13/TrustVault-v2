import Vault from "../models/vault.model.js";
import TrustedContact from "../models/trustedContacts.model.js";
import User from "../models/user.model.js";

// GET /api/user/dashboard
export const getUserDashboard = async (req, res) => {
    try {
        const userId = req.user._id; // assuming you're using JWT & middleware to set req.user

        // Get basic user info
        const user = await User.findById(userId).select("-password");

        // Get vaults and trusted contacts
        const vaults = await Vault.find({ user: userId });
        const trustedContacts = await TrustedContact.find({ user: userId });

        res.status(200).json({
            user,
            vaults,
            trustedContacts,
        });
    } catch (error) {
        console.error("Dashboard fetch error:", error);
        res.status(500).json({ message: "Server Error" });
    }
};
