const express = require('express');
const router = express.Router();
const kategoriController = require('../controllers/kategoriController');

module.exports = (db) => {
  const controller = kategoriController(db);

  router.get('/', controller.getAllCategories);

  router.get('/:id', controller.getCategoryById);

  router.post('/', controller.createCategory);

  router.put('/:id', controller.updateCategory);

  router.delete('/:id', controller.deleteCategory);

  return router;
};
