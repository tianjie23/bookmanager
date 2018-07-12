import React from 'react';
import {Modal, Dropdown, Menu, Button, Popconfirm} from 'antd';
import {connect} from 'react-redux';
import Bread from '../../../components/bread/index';

import Tabler from '../../../utils/table';
import {getBookList, getBookInfo, removeBook, editBook} from '../../../reduxs/actions';
import BookForm from '../bookForm';
import SearchInput from '../../search';


import Utils from '../../../utils/index';

const _utils = new Utils();

const bread = [
    {href: "/index/index", title: "主页", icon: "home"},
    {href: "/index/book", title: "图书馆", icon: "book"},
    {href: "/index/book/index", title: "图书管理", icon: "book"},
];

class BookIndex extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            columns: [
                {
                    title: '书籍编号',
                    dataIndex: 'id',
                    sorter: (a, b) => a.id - b.id,
                },
                {
                    title: '书籍名称',
                    dataIndex: 'name',
                    sorter: (a, b) => a.id - b.id,
                    render: (text, record) => <a href="javascript:;"
                                                 onClick={() => this.showModal(record.id)}
                    >{text}</a>,
                },
                {
                    title: '价格',
                    dataIndex: 'price',
                    sorter: (a, b) => a.price - b.price,
                },
                {
                    title: '借阅者',
                    dataIndex: 'owner_id',
                    sorter: (a, b) => a.owner_id - b.owner_id,
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
                                        onConfirm={() => this.deleteBook(record.id)}
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

    deleteBook = (id) => {
        this.props.removeBook(id);
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
            this.props.editBook(id,this.state.formData);
            _utils.alerts(this.state.title+"成功","success")
        });
    };

    showModal = (id) => {
        this.props.getBookInfo(id);
        this.setState({
            visible: true
        });
    };

    hideModal = () => {
        this.setState({
            visible: false
        })
    };

    componentDidMount() {
        this.props.getBookList();
    }

    render() {
        const header = <SearchInput addBook={this.addHandle}/>;
        const {book} = this.props;
        let id=0,
            price = 0,
            title = "",
            owner_id = 0;
        if (book.bookinfo) {
            id= book.bookinfo.id;
            title = book.bookinfo.name;
            price = book.bookinfo.price;
            owner_id = book.bookinfo.owner_id;
        }
        return (
            <div>
                <Bread bread={bread}/>
                <div className="content-class">
                    <Tabler columns={this.state.columns} data={book.booklist} header={header}/>
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
                        <BookForm record={this.state.formData} comfirmHandle={this.comfirmHandle}/>
                    </div>
                </Modal>

                <Modal
                    title={title}
                    visible={this.state.visible}
                    onOk={this.hideModal}
                    onCancel={this.hideModal}
                    okText="确认"
                    cancelText="取消"
                >
                    <div>
                        <p>编号：{id}</p>
                        <p>价格：￥ {price}</p>
                        <p>借阅人：{owner_id}</p>
                    </div>
                </Modal>
            </div>
        )
    }
}

export default connect(
    state => ({book: state.book}),
    {getBookList, getBookInfo, removeBook, editBook}
)(BookIndex);