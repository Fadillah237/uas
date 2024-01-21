module.exports = (db) => {
    const getAllLoans = (req, res) => {
      db.query('SELECT * FROM peminjaman', (err, results) => {
        if (err) {
          console.error('Error executing query:', err);
          res.status(500).json({ error: 'Internal Server Error' });
        } else {
          res.json(results);
        }
      });
    };
  
    const getLoanById = (req, res) => {
      const peminjamanId = req.params.id;
      db.query('SELECT * FROM peminjaman WHERE id_peminjaman = ?', [peminjamanId], (err, results) => {
        if (err) {
          console.error('Error executing query:', err);
          res.status(500).json({ error: 'Internal Server Error' });
        } else if (results.length === 0) {
          res.status(404).json({ error: 'Peminjaman not found' });
        } else {
          res.json(results[0]);
        }
      });
    };
  
    const borrowBook = (req, res) => {
      const { id_buku, id_anggota, tanggal_pinjam, tanggal_kembali } = req.body;
      db.query('INSERT INTO peminjaman (id_buku, id_anggota, tanggal_pinjam, tanggal_kembali) VALUES (?, ?, ?, ?)',
        [id_buku, id_anggota, tanggal_pinjam, tanggal_kembali],
        (err, results) => {
          if (err) {
            console.error('Error executing query:', err);
            res.status(500).json({ error: 'Internal Server Error' });
          } else {
            res.status(201).json({ message: 'Book borrowed successfully', id: results.insertId });
          }
        });
    };
  
    const updateLoan = (req, res) => {
      const peminjamanId = req.params.id;
      const { id_buku, id_anggota, tanggal_pinjam, tanggal_kembali } = req.body;
      db.query('UPDATE peminjaman SET id_buku = ?, id_anggota = ?, tanggal_pinjam = ?, tanggal_kembali = ? WHERE id_peminjaman = ?',
        [id_buku, id_anggota, tanggal_pinjam, tanggal_kembali, peminjamanId],
        (err, results) => {
          if (err) {
            console.error('Error executing query:', err);
            res.status(500).json({ error: 'Internal Server Error' });
          } else if (results.affectedRows === 0) {
            res.status(404).json({ error: 'Peminjaman not found' });
          } else {
            res.json({ message: 'Loan updated successfully' });
          }
        });
    };
    const deleteLoan = (req, res) => {
      const peminjamanId = req.params.id;
      db.query('DELETE FROM peminjaman WHERE id_peminjaman = ?', [peminjamanId], (err, results) => {
        if (err) {
          console.error('Error executing query:', err);
          res.status(500).json({ error: 'Internal Server Error' });
        } else if (results.affectedRows === 0) {
          res.status(404).json({ error: 'Peminjaman not found' });
        } else {
          res.json({ message: 'Loan deleted successfully' });
        }
      });
    };
  
    return {
      getAllLoans,
      getLoanById,
      borrowBook,
      updateLoan,
      deleteLoan,
    };
  };
  