//server.js is commonly used as the main server file where you set up and configure your Node.js server.
//Here, Import necessary modules and dependencies required for your server.
//Common imports include express for creating a web server, dotenv for managing environment variables,
//mongoose for connecting to MongoDB, etc.

import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import path from "path";
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
import { initSheets } from "./services/spreadsheet.js";

initSheets()
  .then(() => console.log("✅ Google Sheets ready"))
  .catch((err) => {
    console.error("Sheets init failed", err);
    process.exit(1);
  });
// const responseSheetId = "1b3PXg1YVJ7FbnCTGXlhSTkkp3pw4f48BTTcDEbqnWe4";

// const doc = new GoogleSpreadsheet(responseSheetId);
// const credentials = JSON.parse(
//   fs.readFileSync("mnnit-hcms-d96df18b52c8.json", "utf-8")
// );
// // console.log(credentials);/

// const getRow = async (email) => {
//   await doc.useServiceAccountAuth({
//     client_email: credentials.client_email,
//     private_key: credentials.private_key,
//   });

//   await doc.loadInfo();

//   let sheet = doc.sheetsByIndex[0];
//   let rows = await sheet.getRows();

//   for (let index = 0; index < rows.length; index++) {
//     const row = rows[index];
//     if (row.email == email) {
//       // do acc to ur row detail
//       console.log(row.user_name);
//       console.log(row.password);
//     }
//   }
// };

// const addRow = async (rows) => {
//   await doc.useServiceAccountAuth({
//     client_email: credentials.client_email,
//     private_key: credentials.private_key,
//   });
//   await doc.loadInfo();
//   let sheet = doc.sheetsByIndex[0];
//   for (let index = 0; index < rows.length; index++) {
//     const row = rows[index];
//     await sheet.addRow(row);
//   }
// };

// let row = [
//   {
//     email: "xyz@g.c",
//     username: "www",
//     password: "skmskms",
//   },
// ];

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

const __dirname = path.resolve();
//for creating production ready react app
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.join(__dirname, "frontend", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running....");
  });
}
app.use(notFound);
app.use(errorHandler);
// addRow(row);

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log("server runnning....".yellow.bold));