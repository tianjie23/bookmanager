import React from 'react';
import { Table } from 'antd';

class Tabler extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            loading:true
        }
    }

    componentDidMount(){
        this.setState({
            loading:false
        });
    }

    render(){
        return (
            <Table
                columns={this.props.columns}
                dataSource={this.props.data}
                bordered
                loading={this.state.loading}
                title={() => this.props.header}
            />
        )
    }
}

export default Tabler;