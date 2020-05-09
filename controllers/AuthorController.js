const chpConnection = require('../database/CHPConnection');

// Controller that interacts with database to retrieve data.
class AuthorsController {
    constructor() {
        console.log('Author Controller Initialized!');
    }
    
    // Fetches all Authors 
    async Authors(ctx) {
        console.log('Fetches all Authors');
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM Authors';
            
            chpConnection.query(query, (err, res) => {
                if(err) {
                    reject(`Error querying Authors database: ${err}`);
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

    // Fetches a single Author
    async Author(ctx) {
        console.log('Fetches single Author');
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM Authors WHERE `name` = ?;';
            const author = ctx.params.Author;
            
            chpConnection.query({
                sql: query,
                values: [author]
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

    // Add a new Authors
    async addAuthor(ctx, next) {
        console.log('Adds a new Author');
       return new Promise((resolve, reject) => {
           const newAuthors = ctx.request.body;
           chpConnection.query({
               sql: 'INSERT INTO `Authors` (`name`, `description`, `uniqueID`) VALUES (?, ?, ?);',
               values: [newAuthors.name, newAuthors.description, newAuthors.uniqueID]
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

    // Update an Author
    async updateAuthor(ctx, next) {
        console.log('Update an Author');
        return new Promise((resolve, reject) => {
            const newUpdate = ctx.request.body;
            chpConnection.query({
                sql: 'UPDATE `Authors` SET `description` = ? WHERE `name` = ?',
                values: [newUpdate.description, ctx.params.Authors]
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

    async deleteAuthors(ctx, next) {
        console.log('Deleting an Author');
        return new Promise((resolve, reject) => {
            chpConnection.query({
                sql: 'DELETE FROM Authors WHERE `name` = ?;',
                values: [ctx.params.Authors]
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

module.exports = AuthorsController;
