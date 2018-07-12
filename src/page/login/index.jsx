import React from 'react';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import { Link, Redirect } from 'react-router-dom';
import {connect} from 'react-redux';

import { login, resetUser } from '../../reduxs/actions';
import Utils from '../../utils/index';

import './index.less';

const FormItem = Form.Item;
const _utils = new Utils();

class LoginPage extends React.Component{
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const userInfo={
                    username:values.username,
                    password:values.password,
                    remember:values.remember
                };
                this.props.login(userInfo);
            }
        });
    };

    componentDidUpdate(){
        const {user} = this.props;
        if(user.msg){
            _utils.alerts(user.msg,"error");
            this.props.resetUser('');
        }
        //console.log("componentDidUpdate",user.id,user.msg)
    }

    render(){
        const { getFieldDecorator } = this.props.form;
        const {user} = this.props;
        if(user.id){
            return <Redirect to="/index" />
        }
        return (
            <Form onSubmit={this.handleSubmit} className="login-form">
                <FormItem>
                    {getFieldDecorator('username', {
                        rules: [
                            { required: true, message: '请输入用户名!' },
                            { min:5,max:20, message: '用户名6-20个字符!' },
                            ],
                    })(
                        <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="输入用户名" />
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('password', {
                        rules: [
                            { required: true, message: '请输入密码!' },
                            { min:6,max:20, message: '密码6-20个字符!' },
                            ],
                    })(
                        <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="输入密码" />
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('remember', {
                        valuePropName: 'checked',
                        initialValue: true,
                    })(
                        <Checkbox>记住密码</Checkbox>
                    )}
                    <Link className="login-form-forgot" to="">找回密码</Link>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        登录
                    </Button>
                    或者 <Link to="/register">现在注册</Link>
                </FormItem>
            </Form>
        );
    }
}
const LoginForm = Form.create()(LoginPage);

export default connect(
    state=>({user:state.user}),
    { login,resetUser }
)(LoginForm);