import React from 'react';
import {Modal, Dropdown, Menu, Button, Popconfirm, Form, Input} from 'antd';
import {connect} from 'react-redux';
import Bread from '../../components/bread/index';

import Tabler from '../../utils/table';
//import UserForm from './userForm';
import SearchInput from '../search';
import {getUserList,getUserInfo,editUser, removeUser} from "../../reduxs/actions";

import Utils from '../../utils/index';
const bread = [
    {href: "/index/index", title: "主页", icon: "home"},
    {href: "/index/person", title: "个人管理", icon: "user"},
    {href: "/index/person/return", title: "归还记录", icon: "user"},
];

const _utils = new Utils();

class UserIndex extends React.Component{

    constructor(props){
        super(props);
        this.state={
            columns:[
                {
                    title: '用户编号',
                    dataIndex: 'id',
                    sorter: (a, b) => a.id - b.id,
                },
                {
                    title: '用户名',
                    dataIndex: 'username',
                    sorter: (a, b) => a.id - b.id,
                    render: (text, record) => <a href="javascript:;"
                                                 onClick={() => this.showModal(record.id)}
                    >{text}</a>,
                },
                {
                    title: '密码',
                    dataIndex: 'password'
                },
                {
                    title: '权限',
                    dataIndex: 'gender',
                    sorter: (a, b) => a.gender - b.gender,
                },
                {
                    title: '操作',
                    render: (text, record) => (
                        <Dropdown overlay={
                            <Menu>
                                <Menu.Item key="0">
                                    <Popconfirm
                                        title="确定要删除吗？"
                                        cancelText="取消"
                                        okText="确定"
                                        onConfirm={() => this.deleteUser(record.id)}
                                    >
                                        删除
                                    </Popconfirm>
                                </Menu.Item>
                                <Menu.Item key="1" onClick={() => this.editHandle(record)}>
                                    修改
                                </Menu.Item>
                            </Menu>
                        } trigger={['click']}>
                            <Button>操作</Button>
                        </Dropdown>
                    ),
                }
            ],
            visible: false,
            editvisible: false,
            formData: {},
            operation: "",
            title: ""
        }
    }

    deleteUser = (id) => {
        this.props.removeUser(id);
    };

    editHandle = record => {
        this.setState({
            title: "修改",
            editvisible: true,
            operation: "edit",
            formData: record
        });
    };

    addHandle = () => {
        this.setState({
            title: "添加",
            editvisible: true,
            operation: "add",
            formData: ""
        });
    };

    comfirmHandle = (id,data) => {
        this.setState({
            formData: data,
            editvisible: false,
        },()=>{
            this.props.editUser(id,this.state.formData);
            _utils.alerts(this.state.title+"成功","success")
        });
    };

    showModal = (id) => {
        this.props.getUserInfo(id);
        this.setState({
            visible: true
        });
    };

    hideModal = () => {
        this.setState({
            visible: false
        })
    };

    componentDidMount(){
        this.props.getUserList();
    }

    render(){
        const header = <SearchInput addBook={this.addHandle}/>
        const {manager} = this.props;
        let id=0,
            username = "",
            password = "",
            gender = "";
        if (manager.userinfo) {
            id= manager.userinfo.id;
            username = manager.userinfo.username;
            password = manager.userinfo.password;
            gender = manager.userinfo.gender;
        }
        console.log(manager.userlist)
        return(
            <div>
                <Bread bread={bread}/>
                <div className="content-class">
                    <Tabler columns={this.state.columns} data={manager.userlist} header={header}/>
                </div>

                <Modal
                    title={this.state.title}
                    visible={this.state.editvisible}
                    onOk={this.hideModal}
                    onCancel={() => {
                        this.setState({
                            editvisible: false
                        })
                    }
                    }
                    footer={null}
                >
                    <div>
                        {/*<UserForm record={this.state.formData} comfirmHandle={this.comfirmHandle}/>*/}
                    </div>
                </Modal>

                <Modal
                    title={username}
                    visible={this.state.visible}
                    onOk={this.hideModal}
                    onCancel={this.hideModal}
                    okText="确认"
                    cancelText="取消"
                >
                    <div>
                        <p>编号：{id}</p>
                        <p>用户名：{username}</p>
                        <p>密码：{password}</p>
                        <p>权限：{gender}</p>
                    </div>
                </Modal>
            </div>
        )
    }
}


export default connect(
    state => ({manager: state.manager}),
    {getUserList,getUserInfo,editUser, removeUser}
)(UserIndex);