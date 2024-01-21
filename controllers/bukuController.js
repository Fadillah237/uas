module.exports = (db) => {
  const getAllBooks = (req, res) => {
    db.query('SELECT * FROM buku', (err, results) => {
      if (err) {
        console.error('Error executing query:', err);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        res.json(results);
      }
    });
  };

  const getBookById = (req, res) => {
    const bukuId = req.params.id;
    db.query('SELECT * FROM buku WHERE id_buku = ?', [bukuId], (err, results) => {
      if (err) {
        console.error('Error executing query:', err);
        res.status(500).json({ error: 'Internal Server Error' });
      } else if (results.length === 0) {
        res.status(404).json({ error: 'Book not found' });
      } else {
        res.json(results[0]);
      }
    });
  };

  const createBook = (req, res) => {
    const { judul, pengarang, tahun_terbit, kategori_id } = req.body;
    db.query(
      'INSERT INTO buku (judul, pengarang, tahun_terbit, kategori_id) VALUES (?, ?, ?, ?)',
      [judul, pengarang, tahun_terbit, kategori_id],
      (err, results) => {
        if (err) {
          console.error('Error executing query:', err);
          res.status(500).json({ error: 'Internal Server Error' });
        } else {
          res.status(201).json({ message: 'Book added successfully', id: results.insertId });
        }
      }
    );
  };

  const updateBook = (req, res) => {
    const bukuId = req.params.id;
    const { judul, pengarang, tahun_terbit, kategori_id } = req.body;
    db.query(
      'UPDATE buku SET judul = ?, pengarang = ?, tahun_terbit = ?, kategori_id = ? WHERE id_buku = ?',
      [judul, pengarang, tahun_terbit, kategori_id, bukuId],
      (err, results) => {
        if (err) {
          console.error('Error executing query:', err);
          res.status(500).json({ error: 'Internal Server Error' });
        } else if (results.affectedRows === 0) {
          res.status(404).json({ error: 'Book not found' });
        } else {
          res.json({ message: 'Book updated successfully' });
        }
      }
    );
  };

  const deleteBook = (req, res) => {
    const bukuId = req.params.id;
    db.query('DELETE FROM buku WHERE id_buku = ?', [bukuId], (err, results) => {
      if (err) {
        console.error('Error executing query:', err);
        res.status(500).json({ error: 'Internal Server Error' });
      } else if (results.affectedRows === 0) {
        res.status(404).json({ error: 'Book not found' });
      } else {
        res.json({ message: 'Book deleted successfully' });
      }
    });
  };

  const getBookBorrowingMembers = (req, res) => {
    const bookId = req.params.id;
    db.query('SELECT * FROM peminjaman WHERE id_buku = ?', [bookId], (err, results) => {
      if (err) {
        console.error('Error executing query:', err);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        res.json(results);
      }
    });
  };

  const lendBookToMember = (req, res) => {
    const { id_buku, id_anggota, tanggal_pinjam, tanggal_kembali } = req.body;
    db.query(
      'INSERT INTO peminjaman (id_buku, id_anggota, tanggal_pinjam, tanggal_kembali) VALUES (?, ?, ?, ?)',
      [id_buku, id_anggota, tanggal_pinjam, tanggal_kembali],
      (err, results) => {
        if (err) {
          console.error('Error executing query:', err);
          res.status(500).json({ error: 'Internal Server Error' });
        } else {
          res.status(201).json({ message: 'Book lent successfully', id: results.insertId });
        }
      }
    );
  };

  const getBooksByCategory = (req, res) => {
    const kategoriId = req.params.kategoriId;
    db.query('SELECT * FROM buku WHERE kategori_id = ?', [kategoriId], (err, results) => {
      if (err) {
        console.error('Error executing query:', err);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        res.json(results);
      }
    });
  };

  return {
    getAllBooks,
    getBookById,
    createBook,
    updateBook,
    deleteBook,
    getBookBorrowingMembers,
    lendBookToMember,
    getBooksByCategory,
  };
};
