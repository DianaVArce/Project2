const chpConnection = require('../database/CHPConnection');

// Controller that interacts with database to retrieve data.
class GenreController {
    constructor() {
        console.log('Genre Controller Initialized!');
    }
    
    // Fetches all Genre 
    async Genres(ctx) {
        console.log('Fetches all Genres');
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM Genre';
            chpConnection.query(query, (err, res) => {
                if(err) {
                    reject(`Error querying Genre database: ${err}`);
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

    // Fetches a single Genre
    async Genre(ctx) {
        console.log('Fetches single Genre');
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM Genre WHERE `uniqueGenreID` = ?;';
            const singleGen = ctx.params.Genre;
            
            chpConnection.query({
                sql: query,
                values: [singleGen]
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

    // Add a new Genre
    async addGenre(ctx, next) {
        console.log('Adds a new Genre');
       return new Promise((resolve, reject) => {
           const newGenre = ctx.request.body;
           chpConnection.query({
               sql: 'INSERT INTO `Genre`(genreType, uniqueGenreID) VALUES (?, ?);',
               values: [newGenre.genreType, newGenre.uniqueGenreID]
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

    // Update a Genre
    async updateGenre(ctx, next) {
        console.log('Update a Genre');
        return new Promise((resolve, reject) => {
            const newUpdate = ctx.request.body;
            chpConnection.query({
                sql: `
                UPDATE Genre
                SET
                    genreType = ?
                WHERE uniquGenreID = ?
                `,
                values: [newUpdate.genreType, ctx.params.Genres]
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

    async deleteGenre(ctx, next) {
        console.log('Deleting a Genre');
        return new Promise((resolve, reject) => {
            chpConnection.query({
                sql: `DELETE FROM Genre WHERE uniqueGenreID = ?;`,
                values: [ctx.params.Genres]
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

module.exports = GenreController;