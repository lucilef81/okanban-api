const express = require('express');

const ListController = require('./controllers/ListController');
const CardController = require('./controllers/CardController');

const router = express.Router();


/* actions de List */
router.get('/lists', ListController.getAllLists);
router.get('/lists/:id', ListController.getList);
router.post('/lists', ListController.createList);
router.patch('/lists/:id', ListController.editList);
router.put('/lists/:id', ListController.upsertList);
router.delete('/lists/:id', ListController.deleteList);

/* actions de Card */
router.get('/lists/:id/cards', CardController.getCardsByList);

module.exports = router;