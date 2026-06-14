import "dotenv/config";
import pg from "pg";
const pool = new pg.Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT),
});

const getUsers = async (request, response) => {
  try {
    const results = await pool.query("SELECT * FROM users ORDER BY id ASC");
    response.status(200).json(results.rows);
  } catch (error) {
    throw error;
  }
};

const getUserById = async (request, response) => {
  const id = parseInt(request.params.id, 10);
  if (Number.isNaN(id)) {
    return response.status(400).json({ error: "Invalid user id" });
  }

  try {
    const results = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
    if (results.rows.length === 0) {
      return response.status(404).json({ error: "User not found" });
    }
    return response.status(200).json(results.rows[0]);
  } catch (error) {
    console.error("Error fetching user by id:", error);
    return response.status(500).json({ error: "Internal server error" });
  }
};

const createUser = async (request, response) => {
  const { name, email } = request.body;
  if (!name || !email) {
    return response.status(400).json({ error: "Name and email are required" });
  }

  try {
    const results = await pool.query(
      "INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *",
      [name, email],
    );
    return response.status(201).json(results.rows[0]);
  } catch (error) {
    console.error("Error creating user:", error);
    return response.status(500).json({ error: "Internal server error" });
  }
};

const updateUser = async (request, response) => {
  const id = parseInt(request.params.id, 10);
  if (Number.isNaN(id)) {
    return response.status(400).json({ error: "Invalid user id" });
  }

  const { name, email } = request.body;
  if (!name || !email) {
    return response.status(400).json({ error: "Name and email are required" });
  }

  try {
    const result = await pool.query(
      "UPDATE users SET name = $1, email = $2 WHERE id = $3",
      [name, email, id],
    );
    if (result.rowCount === 0) {
      return response.status(404).json({ error: "User not found" });
    }
    return response
      .status(200)
      .json({ message: `User modified with ID: ${id}` });
  } catch (error) {
    console.error("Error updating user:", error);
    return response.status(500).json({ error: "Internal server error" });
  }
};

const deleteUser = async (request, response) => {
  const id = parseInt(request.params.id, 10);

  try {
    await pool.query("DELETE FROM users WHERE id = $1", [id]);
    response.status(200).send(`User deleted with ID: ${id}`);
  } catch (error) {
    throw error;
  }
};

export { getUsers, getUserById, createUser, updateUser, deleteUser };
