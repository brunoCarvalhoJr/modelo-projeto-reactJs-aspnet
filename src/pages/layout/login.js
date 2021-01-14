import React from 'react';
import { Layout, Typography } from 'antd';
import logo from 'assets/logo.png';
const { Header, Content } = Layout;

const AppLayout = ({ children }) => {
  return (
    <Layout>
      <Layout className="site-layout">
        <Header
          className="site-layout-background"
          style={{
            position: 'fixed',
            zIndex: 1,
            width: '100%',
          }}
        >
          <div className="layout-logo">
            <img
              className="logo"
              src={logo}
              width="32"
              height="32"
              alt="Logo"
            />
          </div>
        </Header>

        <Content className="site-content">
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default AppLayout;
