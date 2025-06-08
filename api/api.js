const express = require('express');
const db = require('../database/db');

const router = express.Router();

// 🛡️ Validační pomocná funkce
function isInvalidString(str) {
  return (
    typeof str !== 'string' ||
    str.trim() === '' ||
    /^[\s\.\,\-\_\;\:\(\)\[\]]*$/.test(str)
  );
}

/////////////////////////
// 📚 BOOKS ENDPOINTS //
/////////////////////////

// LIST
router.get('/books', (req, res) => {
  db.all(
    'SELECT books.*, categories.name AS category_name FROM books LEFT JOIN categories ON books.category_id = categories.id',
    [],
    (err, rows) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(rows);
    }
  );
});

// CREATE
router.post('/books', (req, res) => {
  const { title, author, year, description, category_id } = req.body;

  if (
    isInvalidString(title) ||
    isInvalidString(author) ||
    (description && isInvalidString(description))
  ) {
    return res
      .status(400)
      .json({ error: 'Neplatný titul, autor nebo popis.' });
  }

  db.run(
    'INSERT INTO books (title, author, year, description, category_id) VALUES (?, ?, ?, ?, ?)',
    [title, author, year, description, category_id || null],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ message: 'Book created', id: this.lastID });
    }
  );
});

// READ
router.get('/books/:id', (req, res) => {
  db.get('SELECT * FROM books WHERE id = ?', [req.params.id], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ error: 'Book not found' });
    res.json(row);
  });
});

// UPDATE
router.put('/books/:id', (req, res) => {
  const { title, author, year, description, category_id } = req.body;

  if (
    isInvalidString(title) ||
    isInvalidString(author) ||
    (description && isInvalidString(description))
  ) {
    return res
      .status(400)
      .json({ error: 'Neplatný titul, autor nebo popis.' });
  }

  db.run(
    'UPDATE books SET title = ?, author = ?, year = ?, description = ?, category_id = ? WHERE id = ?',
    [title, author, year, description, category_id || null, req.params.id],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      if (this.changes === 0)
        return res.status(404).json({ error: 'Book not found' });
      res.json({ message: 'Book updated' });
    }
  );
});

// DELETE
router.delete('/books/:id', (req, res) => {
  db.run('DELETE FROM books WHERE id = ?', [req.params.id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    if (this.changes === 0)
      return res.status(404).json({ error: 'Book not found' });
    res.json({ message: 'Book deleted' });
  });
});

//////////////////////////////
// 📂 CATEGORIES ENDPOINTS //
//////////////////////////////

// LIST
router.get('/categories', (req, res) => {
  db.all('SELECT * FROM categories', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// CREATE
router.post('/categories', (req, res) => {
  const { name } = req.body;

  if (isInvalidString(name)) {
    return res.status(400).json({ error: 'Neplatný název kategorie.' });
  }

  db.run('INSERT INTO categories (name) VALUES (?)', [name], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: 'Category created', id: this.lastID });
  });
});

// DELETE
router.delete('/categories/:id', (req, res) => {
  db.run('DELETE FROM categories WHERE id = ?', [req.params.id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    if (this.changes === 0)
      return res.status(404).json({ error: 'Category not found' });
    res.json({ message: 'Category deleted' });
  });
});

module.exports = router;
