var express = require('express');
var router = express.Router();
var controller = require('../controller/news.controller');

var db = require('../db');

var shortid = require('shortid');

router.get('/', controller.app);

router.get('/search', controller.search);
router.get('/create', controller.create);



router.get('/:id', controller.view);

router.get('/:id/delete', controller.delete);

router.get('/:id/modify', controller.modify);

router.post('/:id/modify', controller.postModify);

router.post('/create', controller.postCreate);

module.exports = router;