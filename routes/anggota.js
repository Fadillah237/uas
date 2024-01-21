const express = require('express');
const router = express.Router();
const anggotaController = require('../controllers/anggotaController');

module.exports = (db) => {
  const controller = anggotaController(db);

  router.get('/', controller.getAllMembers);

  router.get('/:id', controller.getMemberById);

  router.post('/', controller.createMember);

  router.put('/:id', controller.updateMember);

  router.delete('/:id', controller.deleteMember);

  router.get('/:id/borrowed-books', controller.getMemberBorrowedBooks);

  router.post('/:id/borrow-book', controller.borrowBookForMember);

  router.delete('/:id/return-book', controller.returnBookForMember);

  return router;
};
