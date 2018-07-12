//模拟异步ajax

import db from '../server/db';

import Utils from '../utils/index';

const _utils = new Utils();

const userJson = db.user;
const bookJson = db.book;

class Api {
    LoginApi = (user) => {
        const username = user.username,
            password = user.password,
            remember = user.remember;
        let data = "";
        data = userJson.filter(item => username === item.username && password === item.password);
        if (data.length) {
            _utils.setStorage("userid", data[0].id);
            return {status: 0, data: data[0]};
        } else {
            return {status: 1, msg: "用户名或密码错误"};
        }
    };

    GetUserList = () => {
        const userid = _utils.getStorage("userid");
        return {status: 0, data: userJson};
    };

    GetUserInfoApi = (id) => {
        const userid = _utils.getStorage("userid");
        let data = "";
        data = userJson.filter(item => id === item.id);
        if (data.length) {
            return {status: 0, data: data[0]};
        } else {
            return {status: 1, msg: "未找到数据"};
        }
    };

    DeleteUserApi = (id) => {
        const userid = _utils.getStorage("userid");
        let data = "";
        data = userJson.filter(item => id !== item.id);
        //console.log(data,id)
        if (data.length) {
            return {status: 0, data: data};
        } else {
            return {status: 1, msg: "未找到数据"};
        }
    };

    EditUser = (id, record) => {
        const userid = _utils.getStorage("userid");
        let data = [];
        if (id) {
            userJson.map(item => {
                if (item.id === id) {
                    data.push(Object.assign({},item,record))//[Object.assign({}, item, record)];
                    //console.log(data)
                } else {
                    data.push(item);
                }
            })
        } else {
            data = userJson.concat(record)
        };
        if (data.length) {
            return {status: 0, data: data};
        } else {
            return {status: 1, msg: "失败"};
        }
    };

    GetUserApi = () => {
        const userid = _utils.getStorage("userid");
        let data = "";
        if (!userid) {
            _utils.removeStorage("userid");
            return {status: 1, msg: "未找到用户！"}
        }
        data = userJson.filter(item => userid === item.id);

        if (data.length) {
            return {status: 0, data: data[0]};
        } else {
            return {status: 1, msg: "未找到用户"};
        }
    };
    GetBookApi = () => {
        const userid = _utils.getStorage("userid");
        return {status: 0, data: bookJson};
    };

    GetBookInfoApi = (id) => {
        const userid = _utils.getStorage("userid");
        let data = "";
        data = bookJson.filter(item => id === item.id);
        if (data.length) {
            return {status: 0, data: data[0]};
        } else {
            return {status: 1, msg: "未找到数据"};
        }
    };

    DeleteBookApi = (id) => {
        const userid = _utils.getStorage("userid");
        let data = "";
        data = bookJson.filter(item => id !== item.id);
        if (data.length) {
            return {status: 0, data: data};
        } else {
            return {status: 1, msg: "未找到数据"};
        }
    };

    EditBook = (id, record) => {
        const userid = _utils.getStorage("userid");
        let data = [];
        if (id) {
            bookJson.map(item => {
                if (item.id === id) {
                    data.push(Object.assign({},item,record))//[Object.assign({}, item, record)];
                    //console.log(data)
                } else {
                    data.push(item);
                }
            })
        } else {
            data = bookJson.concat(record)
        };
        console.log(data);
        if (data.length) {
            return {status: 0, data: data};
        } else {
            return {status: 1, msg: "失败"};
        }
    };

    SearchBook = (id) => {
        const userid = _utils.getStorage("userid");
        let data = bookJson.filter(item => (item => id === item.id))
        if (data.length) {
            return {status: 0, data: data};
        } else {
            return {status: 1, msg: "失败"};
        }
    }
}

export default Api;