const AuthorsRouter = require('./Authors');
const BookRouter = require('./Book');
const SeriesRouter = require('./Series');
const PublisherRouter = require('./Publisher');
const GenreRouter = require('./Genre');
const BookViewRouter = require('./BookView');

const defaultRouter = require('koa-router')({
    prefix: '/api'
});

defaultRouter.get('/', ctx => {
    ctx.status = 200;
    ctx.body = "Default Route Found!";
});

defaultRouter.use(
  AuthorsRouter.routes(),
	BookRouter.routes(),
	SeriesRouter.routes(),
	PublisherRouter.routes(),
	GenreRouter.routes(),
 BookViewRouter.routes()
);

module.exports = api => {
    api.use(defaultRouter.routes());
};

