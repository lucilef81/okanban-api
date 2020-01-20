const express = require('express');

const ListController = require('./controllers/ListController');

const router = express.Router();


/* actions de List */
router.get('/lists', ListController.getAllLists);
router.get('/lists/:id', ListController.getList);
router.post('/lists', ListController.createList);
router.patch('/lists/:id', ListController.editList);
router.put('/lists/:id', ListController.upsertList);
router.delete('/lists/:id', listController.deleteList);

module.exports = router;