import React from 'react';
import {Breadcrumb, Icon} from 'antd';
import {Link} from 'react-router-dom';

class Bread extends React.Component {
    render() {
        const {bread} = this.props;
        return (
            <Breadcrumb className="breadcrumb" separator=">">
                {
                    bread && bread.map((item, index) => {
                        return (
                            <Breadcrumb.Item key={index}>
                                <Link to={item.href ? item.href : window.location.pathname}>
                                    {item.icon ? <Icon type={item.icon}/> : null}
                                    {item.title ? <span>{item.title}</span> : null}
                                </Link>
                            </Breadcrumb.Item>
                        )
                    })
                }
            </Breadcrumb>
        )
    }
}

export default Bread;