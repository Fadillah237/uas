module.exports = (db) => {
    const getAllCategories = (req, res) => {
      db.query('SELECT * FROM kategori', (err, results) => {
        if (err) {
          console.error('Error executing query:', err);
          res.status(500).json({ error: 'Internal Server Error' });
        } else {
          res.json(results);
        }
      });
    };
  
    const getCategoryById = (req, res) => {
      const kategoriId = req.params.id;
      db.query('SELECT * FROM kategori WHERE id_kategori = ?', [kategoriId], (err, results) => {
        if (err) {
          console.error('Error executing query:', err);
          res.status(500).json({ error: 'Internal Server Error' });
        } else if (results.length === 0) {
          res.status(404).json({ error: 'Category not found' });
        } else {
          res.json(results[0]);
        }
      });
    };
  
    const createCategory = (req, res) => {
      const { nama_kategori } = req.body;
      db.query('INSERT INTO kategori (nama_kategori) VALUES (?)', [nama_kategori], (err, results) => {
        if (err) {
          console.error('Error executing query:', err);
          res.status(500).json({ error: 'Internal Server Error' });
        } else {
          res.status(201).json({ message: 'Category added successfully', id: results.insertId });
        }
      });
    };
  
    const updateCategory = (req, res) => {
      const kategoriId = req.params.id;
      const { nama_kategori } = req.body;
      db.query('UPDATE kategori SET nama_kategori = ? WHERE id_kategori = ?', [nama_kategori, kategoriId], (err, results) => {
        if (err) {
          console.error('Error executing query:', err);
          res.status(500).json({ error: 'Internal Server Error' });
        } else if (results.affectedRows === 0) {
          res.status(404).json({ error: 'Category not found' });
        } else {
          res.json({ message: 'Category updated successfully' });
        }
      });
    };
  
    const deleteCategory = (req, res) => {
      const kategoriId = req.params.id;
      db.query('DELETE FROM kategori WHERE id_kategori = ?', [kategoriId], (err, results) => {
        if (err) {
          console.error('Error executing query:', err);
          res.status(500).json({ error: 'Internal Server Error' });
        } else if (results.affectedRows === 0) {
          res.status(404).json({ error: 'Category not found' });
        } else {
          res.json({ message: 'Category deleted successfully' });
        }
      });
    };
  
    return {
      getAllCategories,
      getCategoryById,
      createCategory,
      updateCategory,
      deleteCategory,
    };
  };
  