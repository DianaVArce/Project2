const chpConnection = require('../database/CHPConnection');

// Controller that interacts with database to retrieve data.
class SeriesController {
    constructor() {
        console.log('Series Controller Initialized!');
    }
    
    // Fetches all Series 
    async Series(ctx) {
        console.log('Fetches all Series');
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM Series';
            
            chpConnection.query(query, (err, res) => {
                if(err) {
                    reject(`Error querying Series database: ${err}`);
                }
                
                ctx.body = res;
                ctx.status = 200;
                
                resolve();
            });
        })
         .catch(err => {
            ctx.status = 500;
            ctx.body = err;
        });
    }

    // Fetches a single Series
    async SingleSeries(ctx) {
        console.log('Fetches single Series');
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM Series WHERE `Series_name` = ?;';
            const singleSer = ctx.params.SingleSeries;
            
            chpConnection.query({
                sql: query,
                values: [singleSer]
            }, (err, res) => {
                if(err) {
                    reject(err);
                } 
                ctx.body = res;
                ctx.status = 200;
                resolve();
            });
        })
         .catch(err => {
            ctx.status = 500;
            ctx.body = {
                error: `Internal Server Error: ${err}`,
                status: 500
            };
        });
    }

    // Add a new Series
    async addSingleSeries(ctx, next) {
        console.log('Adds a new Series');
       return new Promise((resolve, reject) => {
           const newSeries = ctx.request.body;
           chpConnection.query({
               sql: 'INSERT INTO `Series`(`Series_name`, `first_Book`, uniqueSeriesID, genre) VALUES (?, ?, ?, ?);',
               values: [newSeries.Series_name, newSeries.first_Book, newSeries.uniqueSeriesID, newSeries.genre]
           }, (err, res) => {
               if(err) {
                   reject(err);
               }

               resolve();
           });
           
       })
        .then(await next)
        .catch(err => {
           ctx.status = 500;
           ctx.body = {
               error: `Internal Server Error: ${err}`,
               status: 500
           };
       });
    }

    // Update a Series
    async updateSingleSeries(ctx, next) {
        console.log('Update a Series');
        return new Promise((resolve, reject) => {
            const newUpdate = ctx.request.body;
            chpConnection.query({
                sql: 'UPDATE Series SET genre = ? WHERE Series_name = ?',
                values: [newUpdate.genre, ctx.params.Series]
            }, (err, res) => {
                if(err) {
                    reject(err);
                }

                resolve();
            });
        })
         .then(await next)
         .catch(err => {
            ctx.status = 500;
            ctx.body = {
                error: `Internal Server Error: ${err}`,
                status: 500
            };
        });
    }

    async deleteSingleSeries(ctx, next) {
        console.log('Deleting a Series');
        return new Promise((resolve, reject) => {
            chpConnection.query({
                sql: `DELETE FROM Series WHERE Series_name = ?;`,
                values: [ctx.params.SingleSeries]
            }, (err, res) => {
                if(err) {
                    reject(err);
                }
                resolve();
            });
        })
        .then(await next)
        .catch(err => {
            ctx.status = 500;
            ctx.body = {
                error: `Internal Server Error: ${err}`,
                status: 500
            };
        });
    }
}

module.exports = SeriesController;
