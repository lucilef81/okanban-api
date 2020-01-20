const express = require('express');

const ListController = require('./controllers/ListController');

const router = express.Router();


/* actions de List */
router.get('/lists', ListController.getAllLists);


module.exports = router;