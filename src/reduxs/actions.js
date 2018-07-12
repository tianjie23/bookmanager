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

import Api from '../api/index';

const api = new Api();

const authSuccess = user => ({type: AUTH_SUCCESS, data: user});
const errorMsg = msg => ({type: ERROR_MSG, data: msg});
const receiveUser = user => ({type: RECEIVE_USER, data: user});
export const resetUser = msg => ({type: RESET_USER, data: msg});

const initBook = book => ({type: INIT_BOOK, data: book});
const selectBook = (book,booklist) => ({type: SELECT_BOOK, data: {book,booklist}});
const editBooks = book => ({type: EDIT_BOOK, data: book});
const deleteBook = book => ({type: DELETE_BOOK, data: book});
const errorBook = msg => ({type: ERROR_BOOK, data: msg});

const initUser = user => ({type: INIT_USER, data: user});
const selectUser = (user,userlist) => ({type: SELECT_USER, data: {user,userlist}});
const editUsers = user => ({type: EDIT_USER, data: user});
const deleteUser = user => ({type: DELETE_USER, data: user});
const errorUser = msg => ({type: ERROR_USER, data: msg});

export const login = ({username, password, remember}) => {
    if (!username || !password) {
        return errorMsg('请输入用户名或者密码！')
    }

    return async dispatch => {
        const result = await api.LoginApi({username, password, remember});
        if (result.status === 0) {
            dispatch(authSuccess(result.data))
        } else {
            dispatch(errorMsg(result.msg))
        }
    }
};

export const getUser = () => {
    return async dispatch => {
        const result = await api.GetUserApi();
        if (result.status === 0) {
            dispatch(receiveUser(result.data));
        } else {
            dispatch(resetUser(result.msg))
        }
    }
};
export const getUserList = () => {
    return async dispatch => {
        const result = await api.GetUserList();
        if(result.status===0){
            dispatch(initUser(result.data))
        }else{
            dispatch(errorUser(result.msg))
        }
    }
};

export const getUserInfo = (id) => {
    return async dispatch => {
        const result = await api.GetUserInfoApi(id);
        const listresult = await api.GetUserList();
        if(result.status===0){
            dispatch(selectUser(result.data,listresult.data));
        }else{
            dispatch(errorUser(result.msg))
        }
    }
};


export const removeUser = (id) => {
    return async dispatch => {
        const result = await api.DeleteUserApi(id);
        if(result.status===0){
            dispatch(deleteUser(result.data));
        }else{
            dispatch(errorUser(result.msg))
        }
    }
};


export const editUser = (id, record) => {
    return async dispatch => {
        const result = await api.EditUser(id, record);
        if(result.status===0){
            dispatch(editUsers(result.data));
        }else{
            dispatch(errorUser(result.msg))
        }
    }
};



export const getBookList = () => {
    return async dispatch => {
        const result = await api.GetBookApi();
        if(result.status===0){
            dispatch(initBook(result.data))
        }else{
            dispatch(errorBook(result.msg))
        }
    }
};
export const getBookInfo = (id) => {
    return async dispatch => {
        const result = await api.GetBookInfoApi(id);
        const listresult = await api.GetBookApi();
        if(result.status===0){
            dispatch(selectBook(result.data,listresult.data));
        }else{
            dispatch(errorBook(result.msg))
        }
    }
};

export const removeBook = (id) => {
    return async dispatch => {
        const result = await api.DeleteBookApi(id);
        if(result.status===0){
            dispatch(deleteBook(result.data));
        }else{
            dispatch(errorBook(result.msg))
        }
    }
};


export const editBook = (id, record) => {
    return async dispatch => {
        const result = await api.EditBook(id, record);
        if(result.status===0){
            dispatch(editBooks(result.data));
        }else{
            dispatch(errorBook(result.msg))
        }
    }
};

