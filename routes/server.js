const ServerController = new(require('.../controllers/ServerController'))();
const ServerRouter = require('koa-router')({
    prefix: '/server'
});

ServerRouter.get('/', ServerController.servers);
ServerRouter.get('/:servers', ServerController.servers);
ServerRouter.post('/', ServerController.addServerController, ServerController.servers);
ServerRouter.put('/:servers', ServerController.updateServerController, ServerController.servers);
ServerRouter.delete('/:servers', ServerController.deleteServercontroller, ServerController.servers);

module.exports = ServerRouter;
