import { pool } from "../db.js";

export const getAuthors = async (req, res) => {
  const { rows } = await pool.query("SELECT * FROM authors");
  res.json(rows);
};

export const createAuthor = async (req, res) => {
  const { full_name } = req.body;
  const { rows } = await pool.query(
    "INSERT INTO authors(full_name) VALUES($1) RETURNING *",
    [full_name]
  );
  res.status(201).json(rows[0]);
};

export const updateAuthor = async (req, res) => {
  const { id } = req.params;
  const { full_name } = req.body;

  await pool.query(
    "UPDATE authors SET full_name=$1 WHERE id=$2",
    [full_name, id]
  );
  res.json({ message: "Author updated" });
};

export const deleteAuthor = async (req, res) => {
  const { id } = req.params;
  await pool.query("DELETE FROM authors WHERE id=$1", [id]);
  res.json({ message: "Author deleted" });
};
