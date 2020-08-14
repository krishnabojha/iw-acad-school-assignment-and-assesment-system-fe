import React from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';

const { Header, Content} = Layout;

//Creating our own custom Layout

const CustomLayout = (props) => {
    return (
        <Layout className="layout">
            <Header>
                <Menu mode="horizontal" defaultSelectedKeys={['2']}>
                    <Menu.Item key="1">Home</Menu.Item>
                    <Menu.Item key="2">Login</Menu.Item>
                    <Menu.Item key="3">Sign Up</Menu.Item>
                </Menu>
            </Header>
            <Content style={{ padding: '0 50px' }}>
                <Breadcrumb style={{ margin: '16px 0' }}>Hamro Classroom</Breadcrumb>
                <div>{props.children}</div>
            </Content>
        </Layout>
    );
}


export default CustomLayout;