const BookController = new (require('../controllers/BookController'))();
const BookRouter = require('koa-router')({
    prefix: '/Book'
});

console.log('Book Router Initialized!');

BookRouter.get('/', BookController.Books) //ALL Severs
BookRouter.get('/:Books', BookController.Book) //Single Server
BookRouter.post('/', BookController.addBook, BookController.Books);
BookRouter.put('/:Books', BookController.updateBook, BookController.Book);
BookRouter.delete('/:Books', BookController.deleteBook, BookController.Books);

module.exports = BookRouter;