import React from 'react';
import {Button, Form, Input, Select} from 'antd';


const FormItem = Form.Item;

const formItemLayout = {
    labelCol: {
        xs: {span: 24},
        sm: {span: 4},
    },
    wrapperCol: {
        xs: {span: 24},
        sm: {span: 20},
    },
};
const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 20,
            offset: 4,
        },
    },
};

class UserForm extends React.Component {
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                //console.log('Received values of form: ', values);
                this.props.comfirmHandle(this.props.record.id, values);
            }
        });
    };

    render() {
        const {getFieldDecorator} = this.props.form;
        const {record} = this.props;
        return (
            <Form onSubmit={this.handleSubmit}>
                <FormItem
                    {...formItemLayout}
                    label="用户编号"
                >
                    {getFieldDecorator('id', {
                        rules: [{
                            required: true, message: '用户编号必须填写!',
                        }],
                        initialValue: record ? record.id : ""
                    })(
                        <Input placeholder="请输入用户编号"/>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="用户名"
                >
                    {getFieldDecorator('username', {
                        rules: [{
                            required: true, message: '用户名必须填写!',
                        }],
                        initialValue: record ? record.username : ""
                    })(
                        <Input placeholder="请输入用户名"/>
                    )}
                </FormItem>

                <FormItem
                    {...formItemLayout}
                    label="密码"
                >
                    {getFieldDecorator('password', {
                        rules: [
                            {required: true, message: '请输入密码!'},
                            {min: 6, max: 20, message: '密码6-20个字符!'}
                        ],
                        initialValue: record ? record.password : ""
                    })(
                        <Input type="password" placeholder="请输入密码"/>
                    )}
                </FormItem>

                <FormItem
                    {...formItemLayout}
                    label="权限"
                >
                    {getFieldDecorator('prefix', {
                        initialValue: '86',
                    })(
                        <Select style={{ width: 70 }}>
                            <Select.Option value="86">+86</Select.Option>
                            <Select.Option value="87">+87</Select.Option>
                        </Select>
                    )}
                </FormItem>
                <FormItem {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit">确定</Button>
                </FormItem>
            </Form>
        )
    }
}

const WrappedUserForm = Form.create()(UserForm);
export default WrappedUserForm;