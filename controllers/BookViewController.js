const chpConnection = require('../database/CHPConnection');

class BookViewController {
    constructor() {
        console.log('Book VIEW FINALLY Initialized!');
    }
    
    async viewBook(ct){
    console.log('Calls a view for the Book')
    return new Promise((resolve, reject) => {
        const sqlQuery = 'SELECT * From Book_View;';

        mySQLConnection.query(sqlQuery, (err, queryRes) => {
            if(err){
                console.log("ERRRORRR");
                reject(err);
            }
            console.log("Successfuly worked: Book View");

            ctx.status = 200;
            ctx.body = queryRes;

            resolve();
        });
    })
      .catch(err => {
        ctx.status = 500;
        ctx.body = {
            error: `Internal Server Error: ${err}`,
            status: 500
            }
        });
    }
}

module.exports = BookViewController;