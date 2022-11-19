/* eslint-disable no-shadow */
/* eslint-disable no-else-return */
/* eslint-disable indent */
/* eslint-disable semi */
const { nanoid } = require('nanoid')
const books = require('../booksData')

const addBookHandler = (request, h) => {
    const {
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        reading,
    } = request.payload;

    const id = nanoid(16)
    const insertedAt = new Date().toISOString()
    const updatedAt = insertedAt;
    let finished = false;
    if (name == null) {
        const response = h.response({
            status: 'fail',
            message: 'Gagal menambahkan buku. Mohon isi nama buku',
        })
        response.code(400)
        return response;
    }

    if (readPage > pageCount) {
        const response = h.response({
            status: 'fail',
            message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
        })
        response.code(400)
        return response;
    } else if (pageCount === readPage) {
        finished = true;
    }

    const book = {
        id,
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        finished,
        reading,
        insertedAt,
        updatedAt,
    }
    books.push(book);

    const checkBook = books.filter((book) => book.id === id);
    const isSuccess = checkBook.length > 0;

    if (isSuccess) {
        const response = h.response({
            status: 'success',
            message: 'Buku berhasil ditambahkan',
            data: {
                bookId: id,
            },
        })
        response.code(201);
        return response;
    } else {
        const response = h.response({
            status: 'error',
            message: 'Buku gagal ditambahkan',
        })
        response.code(5000)
        return response
    }
}

const getBookHandler = (request, h) => {
        const response = h.response({
            status: 'success',
            data: {
                books: books.map((book) => ({
                    id: book.id,
                    name: book.name,
                    publisher: book.publisher,
                })),
            },
        })
        response.code(200)
        return response;
}

const getBookByIdHandler = (request, h) => {
    const { bookId } = request.params;

    const book = books.filter((book) => book.id === bookId);
    const bookData = book[0]

    if (bookData !== undefined) {
        const response = h.response({
            status: 'success',
            data: {
                book: bookData,
            },
        })
        response.code(200);
        return response;
    } else {
        const response = h.response({
            status: 'fail',
            message: 'Buku tidak ditemukan',
        })
        response.code(404);
        return response;
    }
}

const updateBookByIdHandler = (request, h) => {
    const { bookId } = request.params;

    const {
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        reading,
    } = request.payload;

    if (name == null) {
        const response = h.response({
            status: 'fail',
            message: 'Gagal memperbarui buku. Mohon isi nama buku',
        })
        response.code(400)
        return response;
    }

    if (readPage > pageCount) {
        const response = h.response({
            status: 'fail',
            message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
        })
        response.code(400)
        return response
    }

    const updatedAt = new Date().toISOString()
    const indexBook = books.findIndex((index) => index.id === bookId);

    if (indexBook !== -1) {
        books[indexBook] = {
            ...books[indexBook],
            name,
            year,
            author,
            summary,
            publisher,
            pageCount,
            readPage,
            reading,
            updatedAt,
        }

        const response = h.response({
            status: 'success',
            message: 'Buku berhasil diperbarui',
        })
        response.code(200)
        return response
    } else {
        const response = h.response({
            status: 'fail',
            message: 'Gagal memperbarui buku. Id tidak ditemukan',
        })
        response.code(404);
        return response;
    }
}

const deleteBooksByIdHandler = (request, h) => {
    const { bookId } = request.params;

    const dataBook = books.findIndex((index) => index.id === bookId)
    if (dataBook !== -1) {
        books.splice(dataBook, 1);
        const response = h.response({
            status: 'success',
            message: 'Buku berhasil dihapus',
        })
        response.code(200)
        return response
    }

    const response = h.response({
        status: 'fail',
        message: 'Buku gagal dihapus. Id tidak ditemukan',
    })
    response.code(404)
    return response;
}

const getBookByNameHandler = (request, h) => {
    const { name } = request.query;

    const response = h.response({
        status: 'success',
        data: {
            books: books.filter((book) => book.name === name),
        },
    })

    response.code(200)
    return response
}

module.exports = {
 addBookHandler,
getBookHandler,
getBookByIdHandler,
updateBookByIdHandler,
deleteBooksByIdHandler,
getBookByNameHandler,
};
