const BookViewController = new (require('../controllers/BookViewController'));
const BookViewRouter = require('koa-router')({
    prefix: '/view'
});

console.log('BookViewRouter FINALLY Initalized!');

BookViewRouter.get('/:BookView', BookViewController.viewBook);

module.exports = BookViewRouter;