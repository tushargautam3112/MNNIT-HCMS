// services/spreadsheet.js
import { GoogleSpreadsheet } from "google-spreadsheet";
import { JWT } from "google-auth-library";
import fs from "fs";
import path from "path";

const SPREADSHEET_ID = "1b3PXg1YVJ7FbnCTGXlhSTkkp3pw4f48BTTcDEbqnWe4";
const creds = JSON.parse(
  fs.readFileSync(path.resolve("mnnit-hcms-d96df18b52c8.json"), "utf-8")
);

const jwtClient = new JWT({
  email: creds.client_email,
  key: creds.private_key.replace(/\\n/g, "\n"),
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

const doc = new GoogleSpreadsheet(SPREADSHEET_ID, jwtClient);
let sheet;

export async function initSheets() {
  // load the spreadsheet info
  await doc.loadInfo();
  sheet = doc.sheetsByIndex[0];

  // try to load an existing header row
  try {
    // this will throw if row 1 is empty
    await sheet.loadHeaderRow();
  } catch (e) {
    // no header row yet — bootstrap your own
    const headers = [
      "createdBy",
      "complaintType",
      "issueType",
      "descriptionStandard",
      "descriptionCustom",
      "generatedAt",
      "resolvedAt",
      "resolvedBy",
    ];
    await sheet.setHeaderRow(headers);
  }
}

export async function addSheetRows(rows) {
  if (!sheet) throw new Error("Google Sheets not initialized");
  return sheet.addRows(rows);
}

export async function getSheetRowByEmail(email) {
  if (!sheet) throw new Error("Google Sheets not initialized");
  const rows = await sheet.getRows();
  return rows.find((r) => r.email === email);
}

export async function logComplaintToExcel(complaint) {
  if (!sheet) throw new Error("Google Sheets not initialized");

  // Map your complaint document to the sheet columns
  const row = {
    createdBy: complaint.createdBy || "unknown",
    complaintType: complaint.complaintType || "n/a",
    issueType: complaint.issueType || "N/A",
    descriptionStandard: Array.isArray(complaint.descriptionStandard)
      ? complaint.descriptionStandard.join(", ")
      : complaint.descriptionStandard || "",
    descriptionCustom: complaint.descriptionCustom || "N/A",
    generatedAt: new Date().toISOString(),
    resolvedAt: "", // always blank on creation
    resolvedBy: "", // always blank on creation
  };

  console.log(row);

  await sheet.addRow(row);
}