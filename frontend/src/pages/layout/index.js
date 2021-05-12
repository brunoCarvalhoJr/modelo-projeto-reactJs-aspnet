import React, { useState } from "react";
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
  UnorderedListOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";

import { Avatar } from "antd";
import { useAuth } from '../../contexts/auth';
import { withRouter } from 'react-router-dom';

import "./layout.css";
const { Header, Content, Sider } = Layout;

const { Text } = Typography;

const AppLayout = ({ children, history}) => {
  const [collapsed, setCollapsed] = useState(true);
  const { signOut, user } = useAuth();

  const handleSignOut = () => {
    signOut();
  };

  const toggle = () => {
    setCollapsed(!collapsed);
  };

  const selecionar = () => {
    history.push('/');
  };

  const pergutnas = () => {
    history.push('/pergunta/listar');
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
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo" />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
          <Menu.Item key="1" icon={<UnorderedListOutlined />} onClick={selecionar}>
            Selecionar de Fazenda
          </Menu.Item>
          <Menu.Item key="2" icon={<QuestionCircleOutlined />} onClick={pergutnas}>
            Perguntas
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header
          className="site-layout-background"
          style={{
            zIndex: 1,
            width: "100%",
          }}
        >
          <div className="layout-logo">
            {'Agro - Monitoramento'}
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
            <Text style={{ color: "#3775F2", paddingLeft: '10px' }} strong>{user.name}</Text>
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

export default withRouter(AppLayout);
