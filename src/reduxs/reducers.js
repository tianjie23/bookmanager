import {combineReducers} from 'redux';

import {
    AUTH_SUCCESS,
    ERROR_MSG,
    RECEIVE_USER,
    RESET_USER,
    INIT_BOOK,
    SELECT_BOOK,
    EDIT_BOOK,
    DELETE_BOOK,
    ERROR_BOOK,
    INIT_USER,
    SELECT_USER,
    EDIT_USER,
    DELETE_USER,
    ERROR_USER,
} from './action-types';

const initUser = {
    id: 0,
    username: "",
    gender: ""
};

function user(state = initUser, action) {
    switch (action.type) {
        case AUTH_SUCCESS:
            return {...action.data};
        case ERROR_MSG:
            return {...state, msg: action.data};
        case RECEIVE_USER:
            return action.data;
        case RESET_USER:
            return {...initUser, msg: action.data};
        default:
            return state;
    }
}

const initBook = [];

function book(state = initBook, action) {
    switch (action.type) {
        case INIT_BOOK:
            return {booklist:action.data};
        case SELECT_BOOK:
            return {bookinfo:action.data.book,booklist:action.data.booklist};
        case EDIT_BOOK:
            return {booklist:action.data};
        case DELETE_BOOK:
            return {booklist:action.data};
        case ERROR_BOOK:
            return action.data;
        default:
            return state;
    }
}
const initUserList = [];

function manager(state = initUserList, action){
    switch (action.type) {
        case INIT_USER:
            return {userlist:action.data};
        case SELECT_USER:
            return {userinfo:action.data.user,userlist:action.data.userlist};
        case EDIT_USER:
            return {userlist:action.data};
        case DELETE_USER:
            return {userlist:action.data};
        case ERROR_USER:
            return action.data;
        default:
            return state;
    }
}

export default combineReducers({
    user,
    book,
    manager
});