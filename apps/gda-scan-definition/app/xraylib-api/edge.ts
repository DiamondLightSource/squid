// https://github.com/xraypy/XrayDB?tab=readme-ov-file
// and schema here
// https://xraypy.github.io/XrayDB/dbschema.html
// file from here

const sqlite3 = require("sqlite3").verbose();

// Initialize an in-memory SQLite database
const db = new sqlite3.Database(".xraydb.sqlite", (err) => {
  if (err) {
    console.error("Failed to open database:", err.message);
    return;
  }
  console.log("Connected to in-memory SQLite database.");
});

// Define a function to get the absorption edge energy for a given element
function getAbsorptionEdgeEnergy(element, callback) {
  const query = `SELECT absorption_edge FROM xray_levels WHERE element = ?`;

  db.get(query, [element], (err, row) => {
    if (err) {
      callback(err, null);
      return;
    }
    if (row) {
      callback(null, row.absorption_edge);
    } else {
      callback(new Error(`Element '${element}' not found.`), null);
    }
  });
}

export async function GET() {
  const res = await fetch("https://data.mongodb-api.com/...", {
    headers: {
      "Content-Type": "application/json",
      "API-Key": process.env.DATA_API_KEY,
    },
  });
  const data = await res.json();

  return Response.json({ data });
}
