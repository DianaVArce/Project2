const AuthorsController = new (require('../controllers/AuthorController'))();
const AuthorsRouter = require('koa-router')({
    prefix: '/Authors'
});

console.log('Authors Router Initialized!');

AuthorsRouter.get('/', AuthorsController.Authors) //ALL Severs
AuthorsRouter.get('/:Author', AuthorsController.Author) //Single Server
AuthorsRouter.post('/', AuthorsController.addAuthor, AuthorsController.Authors);
AuthorsRouter.put('/:Author', AuthorsController.updateAuthor, AuthorsController.Author);
AuthorsRouter.delete('/:Author', AuthorsController.deleteAuthors, AuthorsController.Authors);

module.exports = AuthorsRouter;