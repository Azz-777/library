import { pool } from "../db.js";

export const getBooks = async (req, res) => {
  try {
    const { rows } = await pool.query(`
      SELECT 
        b.id,
        b.title,
        b.author_id,
        b.category_id,
        b.total_copies,
        b.available_copies,
        b.created_at
      FROM books b
      ORDER BY b.id
    `);

    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createBook = async (req, res) => {
  try {
    const {
      title,
      author_id,
      category_id,
      total_copies = 0,
      available_copies
    } = req.body;

    const available = available_copies !== undefined ? available_copies : total_copies;

    const { rows } = await pool.query(
      `INSERT INTO books (title, author_id, category_id, total_copies, available_copies)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [title, author_id, category_id, total_copies, available]
    );

    res.status(201).json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateBook = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title,
      author_id,
      category_id,
      total_copies,
      available_copies
    } = req.body;

    const result = await pool.query(
      `UPDATE books
       SET title = $1,
           author_id = $2,
           category_id = $3,
           total_copies = $4,
           available_copies = $5
       WHERE id = $6`,
      [title, author_id, category_id, total_copies, available_copies, id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Book topilmadi" });
    }

    res.json({ message: "Book yangilandi" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteBook = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      `DELETE FROM books WHERE id = $1`,
      [id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Book topilmadi" });
    }

    res.json({ message: "Book o‘chirildi" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
