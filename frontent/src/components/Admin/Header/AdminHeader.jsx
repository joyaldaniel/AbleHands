
import "./AdminHeader.css"
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserSwitchOutlined,
  UserOutlined,
  UnorderedListOutlined ,
  WifiOutlined,
  DiffOutlined,
  DashboardOutlined
} from '@ant-design/icons';
import { Outlet } from "react-router-dom";
import { Layout, Menu, theme } from 'antd';
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
const { Header, Sider, Content } = Layout;

function MainLayout() {
  const Navigate =useNavigate()
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Layout>
    <Sider trigger={null} collapsible collapsed={collapsed}>
      <div className="logo" />
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={['1']}
         onClick={({key})=>{
                if(key==="signout"){

                }else{
                  Navigate(key)
                }
                
         }}
         
        items={[
          {
            key: '/dashboard',
            icon: < DashboardOutlined />,
            label: 'dashboard',
          },
          {
            key: '/userinfo',
            icon:<  UserOutlined />,
            label: 'user',
          },
          {
            key: '/expertinfo',
            icon:<  UserOutlined />,
            label: 'Expert',
          },
          {
            key: '/category',
            icon:  <DiffOutlined />,
            label: 'category',
          },
          {
            key: 'voluenteer',
            icon: <  UserSwitchOutlined/>,
            label: 'voluenter',
            children:[
              {
                key: 'byestanders',
                icon:<  UserOutlined />,
                label: 'byestanders',
              },
              {
                key: 'pick and drop',
                icon:<  UserOutlined />,
                label: 'pick and drop',
              }
            ]
          },
          {
            key: 'orders',
            icon:<UnorderedListOutlined />,
            label: 'orders',
          },
          {
            key: 'blog',
            icon:<WifiOutlined />,
            label: 'blog',
            children:[

              {
                key: 'add blog',
                icon:<UnorderedListOutlined />,
                label: 'add blog',
              },
            ]
          }
        
        ]}
      />
    </Sider>
    <Layout className="site-layout">
      <Header
     className="d-flex justify-Content-between ps-5 ps-3 "
        style={{
          padding: 0,
          background: colorBgContainer,
        }}
      >
        {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
          className: 'trigger',
          onClick: () => setCollapsed(!collapsed),
        })}

        <div  className=" justify-Content-between-end">
                 
        </div>
      </Header>
      <Content
        style={{
          margin: '24px 16px',
          padding: 24,
          minHeight: 280,
          background: colorBgContainer,
        }}
      >
       <Outlet/>
      </Content>
    </Layout>
  </Layout>
  )
}

export default MainLayout

