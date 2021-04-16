import React from "react";
import {
  Layout,
  Menu,
  Popover,
  Card,
  Typography
} from "antd";
import {
  LogoutOutlined,
  UserOutlined,
} from "@ant-design/icons";

import { Avatar } from "antd";
import { useAuth } from '../../contexts/auth';

import "./layout.css";
const { Header, Content } = Layout;

const { Text } = Typography;

const AppLayout = ({ children }) => {
  const { signOut, user }  = useAuth();

  const handleSignOut = () => {
    signOut();
  };

  const menuUsuario = () => (
    <Menu mode="vertical" defaultSelectedKeys={["2"]}>
      <Menu.Item key="1" icon={<LogoutOutlined />} onClick={handleSignOut}>
        Sair
      </Menu.Item>
    </Menu>
  );

  return (
    <Layout>
      <Layout className="site-layout">
        <Header
          className="site-layout-background"
          style={{
            zIndex: 1,
            width: "100%",
          }}
        >
          <div className="layout-logo">
            {/* <img className="logo" src={logo} width="32" height="32" alt="Logo"/> */}
          </div>
          <div className="profile">
            <Popover
              content={menuUsuario()}
              trigger="click"
              placement="bottomLeft"
            >
              <Avatar
                size="large"
                icon={<UserOutlined />}
                style={{ backgroundColor: "#3775F2", verticalAlign: "middle" }}
              />
            </Popover>
            <Text  style={{ color: "#3775F2", paddingLeft: '10px' }} strong>{user.name}</Text>
          </div>
        </Header>
        <Content className="site-content">
          <Card>
            {children}
          </Card>
        </Content>
      </Layout>
    </Layout>
  );
};

export default AppLayout;
