const chpConnection = require('../database/CHPConnection');

// Controller that interacts with database to retrieve data.
class PublisherController {
    constructor() {
        console.log('Publisher Controller Initialized!');
    }
    
    // Fetches all Publishers 
    async Publishers(ctx) {
        console.log('Fetches all Publishers');
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM Publisher';
            chpConnection.query(query, (err, res) => {
                if(err) {
                    reject(`Error querying Publisher database: ${err}`);
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

    // Fetches a single Publisher
    async Publisher(ctx) {
        console.log('Fetches single Publisher');
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM Publisher WHERE publisherName = ?;';
            const singlePub = ctx.params.Genre;
            
            chpConnection.query({
                sql: query,
                values: [singlePub]
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

    // Add a new Publisher
    async addPublisher(ctx, next) {
        console.log('Adds a new Publisher');
       return new Promise((resolve, reject) => {
           const newPublisher = ctx.request.body;
           chpConnection.query({
               sql: 'INSERT INTO `Publisher`(publisherName, uniquePubID) VALUES (?, ?);',
               values: [newPublisher.publisherName, newPublisher.uniquePubID]
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

    // Update a Publisher
    async updatePublisher(ctx, next) {
        console.log('Update a Genre');
        return new Promise((resolve, reject) => {
            const newUpdate = ctx.request.body;
            chpConnection.query({
                sql: `
                UPDATE Publisher
                SET
                    uniquPubID = ?
                WHERE publisherName = ?
                `,
                values: [newUpdate.uniquPubID, ctx.params.Publisher]
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

    async deletePublisher(ctx, next) {
        console.log('Deleting a Publisher');
        return new Promise((resolve, reject) => {
            chpConnection.query({
                sql: `DELETE FROM Publisher WHERE uniquePubID = ?;`,
                values: [ctx.params.Publishers]
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

module.exports = PublisherController;