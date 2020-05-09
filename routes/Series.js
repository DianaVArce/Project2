const SeriesController = new (require('../controllers/SeriesController'))();
const SeriesRouter = require('koa-router')({
    prefix: '/Series'
});

console.log('Series Router Initialized!');


SeriesRouter.get('/', SeriesController.Series) //ALL Severs
SeriesRouter.get('/:series', SeriesController.SingleSeries) //Single Server
SeriesRouter.post('/', SeriesController.addSingleSeries, SeriesController.Series);
SeriesRouter.put('/:series', SeriesController.updateSingleSeries, SeriesController.SingleSeries);
SeriesRouter.delete('/:series', SeriesController.deleteSingleSeries, SeriesController.Series);

module.exports = SeriesRouter;