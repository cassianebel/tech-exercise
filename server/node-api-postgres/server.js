import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { pool } from "./db.js";

dotenv.config();

const app = express();

app.get("/test", (req, res) => {
  res.send("test route works");
});

app.use(cors());
app.use(express.json());

app.get("/api/db-test", async (req, res) => {
  console.log("DB test route hit");

  try {
    const result = await pool.query("SELECT NOW()");
    console.log(result.rows);

    res.json(result.rows[0]);
  } catch (err) {
    console.error("DATABASE ERROR:");
    console.error(err);

    res.status(500).json({
      error: err.message,
    });
  }
});

app.listen(3001, () => {
  console.log("Server running on http://localhost:3001");
});
