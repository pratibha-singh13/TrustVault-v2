import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
// import cors from "cors";

import path from "path";

import { connectDB } from "./lib/db.js";

import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/user.route.js";
import vaultRoutes from "./routes/vault.route.js";
import trustedContactRoutes from "./routes/trustedContacts.route.js";

dotenv.config();

const app = express();
connectDB();
const PORT = process.env.PORT;
// const __dirname = path.resolve();

app.use(express.json());
app.use(cookieParser());
// app.use(
//     cors({
//         origin: "http://localhost:5173",
//         credentials: true,
//     })
// );

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/vaults", vaultRoutes);
app.use("/api/trusted-contacts", trustedContactRoutes);

// if (process.env.NODE_ENV === "production") {
//   app.use(express.static(path.join(__dirname, "../frontend/dist")));

//   app.get("*", (req, res) => {
//     res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
//   });
// }

app.listen(PORT, () => {
    console.log("server is running on PORT:" + PORT);

});