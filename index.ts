import dotenv from "dotenv";
dotenv.config();
import express, { Application, Request, Response, NextFunction } from "express";
const app: Application = express();
import cors from "cors";
import cookieParser from "cookie-parser";
import { connectDB } from "./db/connect";
import authRoutes from "./routes/auth_route";
import userRoutes from "./routes/user_route";
import postRoutes from "./routes/post_route";
const PORT = process.env.BACKEND_PORT || 5000;

app.use(cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());

connectDB();

app.get("/test", (req: Request, res: Response, next: NextFunction) => {
    res.json("Hi").status(200);
});

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/post", postRoutes);


app.use((err: { status: number, message: string }, req: Request, res: Response, next: NextFunction) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "something went wrong";

    return res.status(errorStatus).json(errorMessage);
});

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
});