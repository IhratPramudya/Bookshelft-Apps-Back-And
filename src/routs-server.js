/* eslint-disable indent */

const {
 // eslint-disable-next-line max-len
 addBookHandler, getBookHandler, getBookByIdHandler, updateBookByIdHandler, deleteBooksByIdHandler, getBookByNameHandler,
} = require('./handler-server');

const routs = [
    {
        method: 'POST',
        path: '/books',
        handler: addBookHandler,
    },
    {
        method: 'GET',
        path: '/books',
        handler: getBookHandler,
    },
    {
        method: 'GET',
        path: '/books/{bookId}',
        handler: getBookByIdHandler,
    },
    {
        method: 'PUT',
        path: '/books/{bookId}',
        handler: updateBookByIdHandler,
  },
  {
      method: 'DELETE',
      path: '/books/{bookId}',
      handler: deleteBooksByIdHandler,
  },
  {
      method: 'GET',
      path: '/books/',
      handler: getBookByNameHandler,
  },
];

module.exports = routs;
