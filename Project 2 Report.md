# Project2
CURL COMMANDS FOR Returning ALL Entites in a Table from Database:

	curl http://localhost:8005/api/Authors
	curl http://localhost:8005/api/Book
	curl http://localhost:8005/api/Series
	curl http://localhost:8005/api/Publisher
	curl http://localhost:8005/api/Genre 

CURL COMMANDS For Returning a SINGLE Entity from a Table in Database:

	curl http://localhost:8005/api/Authors/Erin%20Hunter
		Returns Single Author who’s name is Erin Hunter
	curl http://localhost:8005/api/Book/Mossflower
		Returns Single Book who’s title is Mossflower
	curl http://localhost:8005/api/Genre/Visual%20novel
		Returns a Single genre who’s title is Visual Novel
	curl http://localhost:8005/api/Publisher/Harper%20Collins
		Returns a single publisher known as Harper Collins
	curl http://localhost:8005/api/Series/Warriors
		Returns a single series named Warriors

CURL COMMANDS ADDING A BRAND NEW ENTITY:

	curl -X POST -H 'Content-Type: application/json' -d '{"name":"Ace Styles","description":"Author of SK","uniqueID":"6710"}' http://localhost:8005/api/Authors
		- Adds a new author!
	curl -X POST -H 'Content-Type: application/json' -d '{"Title":"The Lost Princess","datePublished":"2007-08-10","totalPageCount":"120","publisher":"Self","author":"Ace Styles","SeriesName":"Super Kids Chronicles"}' http://localhost:8005/api/Book
		-Adds a new Book!
	curl -X POST -H 'Content-Type: application/json' -d '{"Series_name":"Super Kids Chronicles","first_Book":"The Lost Princess","uniqueSeriesID":"6710"}' http://localhost:8005/api/Series
		-Adds a new Series
	curl -X POST -H 'Content-Type: application/json' -d '{"genreType":"Fantasy and Romance","uniqueGenreID":"5007"}' http://localhost:8005/api/Genre
		- Adds a new Genre
	curl -X POST -H 'Content-Type: application/json' -d '{"publisherName":"Self","uniquePubID":"6710"}' http://locahost:8005/api/Publisher
		- Adds a new Publisher!


CURL COMMAND For UPDATING an Entity from a Table in Database:
	curl -X PUT -H 'Content-Type: application/json' -d '{"name":"Ace Styles","description":"Author of SK","uniqueID":"6710"}' 		http://localhost:8005/api/Authors


CURL COMMANDS For DELETING a SINGLE Entity from a Table in Database :

	curl -X DELETE http://localhost:8005/api/Authors/Ace%Styles
		Returns Single Author who’s name is Erin Hunter
	curl -X DELETE http://localhost:8005/api/Book/The%Lost%Princess
		- Deletes the Book named The Lost Princess
	curl-X DELETE http://localhost:8005/api/Series/Super%Kids%Chronicles
		- Deletes the Series Super Kids Chronciles
	curl -X DELETE http://localhost:8005/api/Publisher/Self
		- Deletes the publisher Self
	curl -X DELETE http://localhost:8005/api/Genre/Fantasy%20Romance
		- Deletes the genre Fantasy Romance
