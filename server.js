const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');
const { errorHandler } = require('./Middleware/errorMiddleware');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'perpustakaan'
});

db.connect((err) => {
  if (err) {
    console.error('Unable to connect to the database:', err);
  } else {
    console.log('Database connection established successfully');
  }
});

const bukuRouter = require('./routes/buku')(db);
const anggotaRouter = require('./routes/anggota')(db);
const peminjamanRouter = require('./routes/peminjaman')(db);
const kategoriRouter = require('./routes/kategori')(db); // Tambahkan ini

app.use('/buku', bukuRouter);
app.use('/anggota', anggotaRouter);
app.use('/peminjaman', peminjamanRouter);
app.use('/kategori', kategoriRouter); // Tambahkan ini

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
