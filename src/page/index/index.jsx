import React from 'react';
import {Row, Col, Icon} from 'antd';
import Bread from '../../components/bread/index';

import './index.less';
import db from '../../server/db';

const bread = [
    {href: "/index/index", title: "主页", icon: "home"},
];

const Box = props => <div className="index_col">{props.children}</div>;

class Index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            bookCount   :0,
            userCount   :0,
            borrowCount :0,
            noteCount   :0
        }
    }

    componentDidMount(){
        //console.log(db.book);
        this.setState({
            bookCount:db.book.length,
            userCount:db.user.length,
            borrowCount:db.borrow.length,
            noteCount:db.note.length,
        });
    }

    render() {
        return (
            <div>
                <Bread bread={bread}/>
                <Row gutter={8} className="index_row">
                    <Col md={6}>
                        <Box>
                            <Icon type="book" className="index_icon car"/>
                            <div className="number">{this.state.bookCount}</div>
                            <div>书库书籍</div>
                        </Box>
                    </Col>
                    <Col md={6}>
                        <Box>
                            <Icon type="user" className="index_icon fax"/>
                            <div className="number">{this.state.userCount}</div>
                            <div>用户数量</div>
                        </Box>
                    </Col>
                    <Col md={6}>
                        <Box>
                            <Icon type="code-o" className="index_icon camera"/>
                            <div className="number">{this.state.borrowCount}</div>
                            <div>借阅数量</div>
                        </Box>
                    </Col>
                    <Col md={6}>
                        <Box>
                            <Icon type="edit" className="index_icon mail"/>
                            <div className="number">{this.state.noteCount}</div>
                            <div>笔记数量</div>
                        </Box>
                    </Col>
                </Row>
                {/*<div className="index_row content-class">*/}
                {/*</div>*/}
            </div>
        )
    }
}

export default Index;