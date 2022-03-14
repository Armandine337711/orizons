const express = require('express');

const jwt = require('../middleware/auth')

const categoryController = require('../controllers/categoryController');

const router = express.Router();
console.log('------------OK router ----------')
router.get('/', categoryController.getAllCategory);
router.get('/:categoriesId', categoryController.getOneCategory);
router.post('/', categoryController.createCategory);
router.patch('/', categoryController.updateAllCategory);
router.patch('/:categoriesId', categoryController.updateOneCategory);
router.delete('/', categoryController.deleteAllCategory);
router.delete('/:categoriesId', categoryController.deleteOneCategory);


module.exports = router;