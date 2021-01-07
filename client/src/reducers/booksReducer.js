import * as Types from '../constants/ActionType'
const initialState = {
    books: [],
    selectedBook: null,

};

export default function (state = initialState, action) {
    switch (action.type) {

        case Types.GET_ALLBOOK:
            return {
                ...state,
                books: action.books,

            };
        case Types.ADD_BOOK:
            const addedBook = action.item;
            return {
                ...state,
                books: [...state.books, addedBook]

            };
        case Types.GET_BOOK_BY_ID:
            return {
                ...state,
                selectedBook: action.selectedBook
            };
        case Types.DELETE_BOOK:
            let updatedBooks;
            console.log(state.books)
            for (let i = 0; i < state.books.length; i++) {
                if (action.id === state.books[i]._id) {
                    updatedBooks = [...state.books];

                    updatedBooks.splice(i, 1)
                    let st = {
                        ...state,
                        books: updatedBooks,
                    };
                    return st;
                }
            }

        case Types.GET_BOOK_BY_ID:
            return {
                ...state,
                selectedBook: action.selectedBook
            };
        case Types.SEARCH_BOOK:
            return {
                ...state,
                searchedResultBooks: action.searchedResultBooks
            }
        default: return state;
    }
}
