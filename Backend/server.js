//server.js is commonly used as the main server file where you set up and configure your Node.js server. 
//Here, Import necessary modules and dependencies required for your server.
//Common imports include express for creating a web server, dotenv for managing environment variables,
//mongoose for connecting to MongoDB, etc.

import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import path from 'path';
import connectDB from "./Config/db.js";
import { notFound, errorHandler } from "./Middleware/errorHandler.js";
import userRoutes from "./routes/userRoutes.js";
import userRoleRoutes from "./routes/userRoleRoutes.js";
import complaintRoutes from "./routes/complaintRoutes.js";
import serviceRoutes from "./routes/servicesRoutes.js";
import announcementRoutes from "./routes/announcementRoute.js";
import workerFormRoutes from "./routes/workerFormRoutes.js";
import schedulingQueueRoutes from "./routes/schedulingqueueRoute.js";
import { sendEmailOnStatusChangeWorker } from "./Workers/emailSenderWorker.js";
//It is a security feature implemented by web browsers to restrict web pages from making requests to a different domain than the one that served the original web page.
import cors from "cors";

//Created an instance of the Express application (app) and configure it with middleware.
const app = express();

//dotenv is particularly useful for storing sensitive information or configuration values that you don't want to hardcode into your source code. 
dotenv.config();
connectDB();

//Middleware like express.json() is used to parse incoming request bodies as JSON.
//cors() middleware is used for enabling Cross-Origin Resource Sharing.
app.use(express.json());
app.use(cors());

//define routes using app.use() to mount route handlers for various API endpoints.
app.use("/api/users", userRoutes);
app.use("/api/userRoles", userRoleRoutes);
app.use("/api/complaints", complaintRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/announcements", announcementRoutes);
app.use("/api/workerData", workerFormRoutes);
app.use("/api/queue", schedulingQueueRoutes);

sendEmailOnStatusChangeWorker.start();

const __dirname = path.resolve()
//for creating production ready react app
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '/frontend/build')))

    app.get('*', (req, res) => res.sendFile(path.join(__dirname, 'frontend', 'build', 'index.html')))
}else{
  app.get("/", (req, res) => {
    res.send("API is running....");
  });
}
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log("server runnning....".yellow.bold));
