import React from 'react';
import { Layout, Menu, Icon } from 'antd';
import { Link } from 'react-router-dom';

import {menus} from './sider';

const { Sider } = Layout;
const { SubMenu } = Menu;


const MenuItems = ({key, title, icon}) =>
    <Menu.Item key={key}>
        <Link to={key}>
            {icon && <Icon type={icon}/>}<span>{title}</span>
        </Link>
    </Menu.Item>;

const SubItems = ({key, title, icon, sub}) =>
    <SubMenu
        key={key}
        title={<span><Icon type={icon}/><span>{title}</span></span>}
    >
        {sub && sub.map(item => MenuItems(item))}
    </SubMenu>;


class Side extends React.Component{
    render(){
        return (
            <Sider style={{ background: '#fff' }}>
                <Menu
                    mode="inline"
                    defaultSelectedKeys={['/index/index']}
                    style={{ height: '100%', borderRight: 0 }}
                >
                    {
                        menus && menus.map((item) =>
                            item.sub && item.sub.length ?
                                SubItems(item) : MenuItems(item)
                        )
                    }
                </Menu>
            </Sider>
        )
    }
}

export default Side;