const chpConnection = require('../database/CHPConnection');

// Controller that interacts with database to retrieve data.
class BookController {
    constructor() {
        console.log('Book Controller Initialized!');
    }
    
    // Fetches all Books 
    async Books(ctx) {
        console.log('Fetches all Books');
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM Book';
            chpConnection.query(query, (err, res) => {
                if(err) {
                    reject(`Error querying Books database: ${err}`);
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

    // Fetches a single Book
    async Book(ctx) {
        console.log('Fetches single Book');
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM `Book` WHERE `Title` = ?;';
            const Book = ctx.params.Book;
            
            chpConnection.query({
                sql: query,
                values: [Book]
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

    //Route for the View
    async viewBook(ctx, next){
        console.log('Calls a view for the Book')
        return new Promise((resolve, reject) => {
            const newViewBook = ctx.request.body;
            chpConnection.query({
                sql: 'SELECT * From Book_View;',
                values: []

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

    // Add a new Book
    async addBook(ctx, next) {
        console.log('Adds a new Book');
       return new Promise((resolve, reject) => {
           const newBook = ctx.request.body;
           chpConnection.query({
               sql: 'INSERT INTO `Book` (`Title`, `datePublished`, `totalPageCount`, publisher, `author`, `SeriesName`) VALUES (?, ?, ?, ?, ?, ?);',
               values: [newBook.Title, newBook.datePublished, newBook.totalPageCount, newBook.publisher, newBook.author, newBook.SeriesName]
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

    // Update a Book
    async updateBook(ctx, next) {
        console.log('Update a Book');
        return new Promise((resolve, reject) => {
            const newUpdate = ctx.request.body;
            chpConnection.query({
                sql: `
                    UPDATE Book
                    SET
                        datePublished =  ?
                        totalPageCount = ?
                    WHERE Title = ?
                    `,
                values: [newUpdate.datePublished, newUpdate.totalPageCount, ctx.params.Book]
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

    async deleteBook(ctx, next) {
        console.log('Deleting a Book');
        return new Promise((resolve, reject) => {
            chpConnection.query({
                sql: `DELETE FROM Book WHERE Title = ?;`,
                values: [ctx.params.Book]
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

module.exports = BookController;