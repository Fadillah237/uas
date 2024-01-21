const express = require('express');
const router = express.Router();
const peminjamanController = require('../controllers/peminjamanController');

module.exports = (db) => {
  const controller = peminjamanController(db);

  router.get('/', controller.getAllLoans);

  router.get('/:id', controller.getLoanById);

  router.post('/', controller.borrowBook);

  router.put('/:id', controller.updateLoan);

  router.delete('/:id', controller.deleteLoan);

  return router;
};
