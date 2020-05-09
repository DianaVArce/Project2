const GenreController = new (require('../controllers/GenreController'))();
const GenreRouter = require('koa-router')({
    prefix: '/Genre'
});

console.log('Genre Router Initialized!');


GenreRouter.get('/', GenreController.Genres) //ALL Severs
GenreRouter.get('/:Genre', GenreController.Genre) //Single Server
GenreRouter.post('/', GenreController.addGenre, GenreController.Genres);
GenreRouter.put('/:Genre', GenreController.updateGenre, GenreController.Genre);
GenreRouter.delete('/:Genre', GenreController.deleteGenre, GenreController.Genres);

module.exports = GenreRouter;