import { betterAuth } from "better-auth";
import { pool } from "./db.js";

export const auth = betterAuth({
  database: pool,

  emailAndPassword: {
    enabled: true,
  },

  trustedOrigins: ["http://localhost:5173", "http://localhost:3001"],
});
