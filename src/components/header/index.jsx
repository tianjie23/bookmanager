import React from 'react';
import {Layout, Menu, Icon, Row, Col, Avatar, Badge} from 'antd';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

import '../header/index.less';
import {getUser} from '../../reduxs/actions';

const {Header} = Layout;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;


class Head extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: true,
        }
    }

    componentDidMount() {
        this.props.getUser();
    }

    render() {
        const {user} = this.props;
        // this.setState({
        //     username: user.username
        // });
        return (
            <Header>
                <Row gutter={8}>
                    <Col md={4}>
                        <div className="logo"/>
                    </Col>
                    <Col md={4} offset={16} className="textRight">
                        <Menu
                            mode="horizontal"
                            theme="dark"
                            style={{lineHeight: '64px', float: 'right'}}
                        >
                            <Menu.Item>
                                <Badge dot={this.state.show}>
                                    <Icon type="notification" className="menu-css"/>
                                </Badge>
                            </Menu.Item>
                            <SubMenu title={<Avatar src="http://p2.qhimgs4.com/t016245f1a43c5df071.jpg"/>}>
                                <MenuItemGroup title="用户中心">
                                    <Menu.Item key="setting:1">你好 - {user.username}</Menu.Item>
                                    <Menu.Item key="setting:2"><Link to="/index/user/info">个人信息</Link></Menu.Item>
                                    <Menu.Item key="logout"><span onClick={this.logout}>退出登录</span></Menu.Item>
                                </MenuItemGroup>
                            </SubMenu>
                        </Menu>
                    </Col>
                </Row>
            </Header>
        )
    }
}

export default connect(
    state => ({user: state.user}),
    {getUser}
)(Head);