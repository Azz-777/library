import { pool } from "../db.js";

export const getCategories = async (req, res) => {
  try {
    const { rows } = await pool.query(`
      SELECT id, name, created_at FROM categories ORDER BY id
    `);
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createCategory = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ error: "Category name majburiy" });
    }

    const { rows } = await pool.query(
      `INSERT INTO categories (name) VALUES ($1) RETURNING *`,
      [name]
    );

    res.status(201).json(rows[0]);
  } catch (error) {
    if (error.code === '23505') {
      return res.status(400).json({ error: "Category nomi allaqachon mavjud" });
    }
    res.status(500).json({ error: error.message });
  }
};

export const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ error: "Category name majburiy" });
    }

    const result = await pool.query(
      `UPDATE categories SET name = $1 WHERE id = $2`,
      [name, id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Category topilmadi" });
    }

    res.json({ message: "Category yangilandi" });
  } catch (error) {
    if (error.code === '23505') {
      return res.status(400).json({ error: "Category nomi allaqachon mavjud" });
    }
    res.status(500).json({ error: error.message });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(`DELETE FROM categories WHERE id = $1`, [id]);

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Category topilmadi" });
    }

    res.json({ message: "Category o‘chirildi" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
