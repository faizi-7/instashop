import path from "path";
import express from "express";
import dotenv from "dotenv";
dotenv.config();
import connectDB from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import cookieParser from "cookie-parser";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";
import cors from "cors";

const port = 8000;

connectDB(); //Connect to MongoDB

const app = express();

app.use(cors());
//Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());


app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/upload", uploadRoutes);

app.get("/api/config/paypal", (req, res) =>
res.send({ clientId: process.env.PAYPAL_CLIENT_ID })
);

const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// app.use('/uploads', express.static(__dirname + '/uploads/'));

if (process.env.NODE_ENV === "production") {
    // set static folder
    app.use(express.static(path.join(__dirname, '/frontend/dist')));
    app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
    );
} else {
    app.get("/", (req, res) => {
      res.send("API is running !");
    });
}

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`App is running at port: ${port}`));