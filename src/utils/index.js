import {message} from "antd";

message.config({
    maxCount: 1
});

class Utils {
    alerts = (msg, stat) => {
        switch (stat) {
            case "success":
                message.success(msg);
                return;
            case "info":
                message.info(msg);
                return;
            case "error":
                message.error(msg);
                return;
            case "warning":
                message.warning(msg);
                return;
            case "warn":
                message.warn(msg);
                return;
            case "loading":
                message.loading(msg);
                return;
            default:
                message.info(msg);
        }
    };

    setStorage = (name, data) => {
        let dataType = typeof data;
        // json对象
        if(dataType === 'object'){
            window.localStorage.setItem(name, JSON.stringify(data));
        }
        // 基础类型
        else if(['number','string','boolean'].indexOf(dataType) >= 0){
            window.localStorage.setItem(name, data);
        }
        // 其他不支持的类型
        else{
            alert('该类型不能用于本地存储');
        }
    };

    getStorage = (name) => {
        let data = window.localStorage.getItem(name);
        if(data){
            return JSON.parse(data);
        }
        else{
            return '';
        }
    };

    removeStorage = (name) => {
        window.localStorage.removeItem(name);
    };
}

export default Utils;