import React from 'react';
import { Layout } from 'antd';

import Header from '../header/index';
import Sider from '../sider/index';


const { Content } = Layout;

class Main extends React.Component{
    render(){
        return (
            <Layout>
                <Header />
                <Layout>
                    <Sider />
                    <Layout style={{ padding: '0 24px 24px' }}>
                        <Content>
                            {this.props.children}
                        </Content>
                    </Layout>
                </Layout>
            </Layout>
        )
    }
}

export default Main;