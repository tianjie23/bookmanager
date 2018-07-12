
import React from 'react';
import {Button, Form, Input} from 'antd';


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

class BookForm extends React.Component{
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                //console.log('Received values of form: ', values);
                this.props.comfirmHandle(this.props.record.id,values);
            }
        });
    };
    render(){
        const { getFieldDecorator } = this.props.form;
        const { record } = this.props;
        return (
            <Form onSubmit={this.handleSubmit}>
                <FormItem
                    {...formItemLayout}
                    label="书籍编号"
                >
                    {getFieldDecorator('id', {
                        rules: [{
                            required: true, message: '书籍编号必须填写!',
                        }],
                        initialValue : record ? record.id : ""
                    })(
                        <Input placeholder="请输入书籍编号" />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="书籍名称"
                >
                    {getFieldDecorator('name', {
                        rules: [{
                            required: true, message: '书籍名称必须填写!',
                        }],
                        initialValue : record ? record.name : ""
                    })(
                        <Input placeholder="请输入书籍名称" />
                    )}
                </FormItem>

                <FormItem
                    {...formItemLayout}
                    label="书籍价格"
                >
                    {getFieldDecorator('price', {
                        rules: [{
                            pattern: /(^[1-9](\d+)?(\.\d{1,2})?$)|(^(0){1}$)|(^\d\.\d{1,2}?$)/, message: '书籍价格必须为数字!',
                        }, {
                            required: true, message: '书籍价格必须填写!',
                        }],
                        initialValue : record ? record.price : ""
                    })(
                        <Input placeholder="请输入书籍价格" />
                    )}
                </FormItem>
                <FormItem {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit">确定</Button>
                </FormItem>
            </Form>
        )
    }
}

const WrappedBookForm = Form.create()(BookForm);
export default WrappedBookForm;