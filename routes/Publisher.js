const PublisherController = new (require('../controllers/PublisherController'))();
const PublisherRouter = require('koa-router')({
    prefix: '/Publisher'
});

console.log('Publisher Router Initialized!');

PublisherRouter.get('/', PublisherController.Publishers) //ALL Severs
PublisherRouter.get('/:Publishers', PublisherController.Publisher) //Single Server
PublisherRouter.post('/', PublisherController.addPublisher, PublisherController.Publishers);
PublisherRouter.put('/:Publishers', PublisherController.updatePublisher, PublisherController.Publisher);
PublisherRouter.delete('/:Publishers', PublisherController.deletePublisher, PublisherController.Publishers);

module.exports = PublisherRouter;