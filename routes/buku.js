const express = require('express');
const router = express.Router();
const bukuController = require('../controllers/bukuController');

module.exports = (db) => {
  const controller = bukuController(db);

  router.get('/', controller.getAllBooks);

  router.get('/:id', controller.getBookById);

  router.post('/', controller.createBook);

  router.put('/:id', controller.updateBook);

  router.delete('/:id', controller.deleteBook);

  router.get('/kategori/:kategoriId', controller.getBooksByCategory);

  router.post('/pinjam', controller.lendBookToMember);

  return router;
};
