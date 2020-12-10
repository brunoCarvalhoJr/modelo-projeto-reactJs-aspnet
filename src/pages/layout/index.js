import React from "react";
import {
  Layout,
  Menu,
  Popover,
  Card,
  Statistic,
  Typography,
} from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
  LikeOutlined,
  MedicineBoxOutlined,
  FlagOutlined,
  SyncOutlined,
} from "@ant-design/icons";

import { Avatar } from "antd";
import "./layout.css";
import logo from "assets/logo.png";
const { Header, Content } = Layout;

const { Title } = Typography;

const AppLayout = ({children}) => {
  const contentMenu = () => (
    <Menu mode="vertical" defaultSelectedKeys={["2"]}>
      <Menu.Item key="1" icon={<MenuUnfoldOutlined />}>
        nav 1
      </Menu.Item>
      <Menu.Item key="2" icon={<MenuFoldOutlined />}>
        nav 2
      </Menu.Item>
      <Menu.Item key="3" icon={<UserOutlined />}>
        nav 3
      </Menu.Item>
    </Menu>
  );

  return (
    <Layout>
      <Layout className="site-layout">
        <Header
          className="site-layout-background"
          style={{
            position: "fixed",
            zIndex: 1,
            width: "100%",
          }}
        >
          <div className="layout-logo">
            <img className="logo" src={logo} width="32" height="32" alt="Logo"/>
            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["2"]}>
              <Menu.Item key="1" icon={<MenuUnfoldOutlined />}>
                Cadastro talão
              </Menu.Item>
              <Menu.Item key="2" icon={<MenuFoldOutlined />}>
                Cadastro fazenda
              </Menu.Item>
              <Menu.Item key="3" icon={<UserOutlined />}>
                Cadastro de pragas
              </Menu.Item>
              <Menu.Item key="4" icon={<UserOutlined />}>
                Cadastro de defensivos
              </Menu.Item>
              <Menu.Item key="5" icon={<UserOutlined />}>
                Cadastro de sementes
              </Menu.Item>
              <Menu.Item key="6" icon={<UserOutlined />}>
                Cadastro de fertilizantes
              </Menu.Item>
              <Menu.Item key="7" icon={<UserOutlined />}>
                Monitorametno
              </Menu.Item>
            </Menu>
          </div>
          <Popover
            content={contentMenu()}
            trigger="click"
            placement="bottomLeft"
          ></Popover>
          <div className="profile">
            <Popover
              content={<div></div>}
              trigger="click"
              placement="bottomLeft"
            >
              <Avatar
                size="large"
                icon={<UserOutlined />}
                style={{ backgroundColor: "#3775F2", verticalAlign: "middle" }}
              />
            </Popover>
          </div>
        </Header>

        <div className="site-layout-sub-header">
          <div className="site-layout-sub-header-content">
            <div className="fazenda">
              <SyncOutlined />
              <Title>Faz. Monte Verde</Title>
            </div>
            <Statistic
              title="Nº de talões"
              value={1128}
              prefix={<FlagOutlined/>}
            />
            <Statistic
              title="Correções"
              value={11.28}
              precision={2}
              valueStyle={{ color: "#3f8600" }}
              prefix={<ArrowUpOutlined />}
              suffix="%"
            />
            <Statistic
              title="Pragas"
              value={9.3}
              precision={2}
              valueStyle={{ color: "#cf1322" }}
              prefix={<ArrowDownOutlined />}
              suffix="%"
            />
            <Statistic
              title="Área de Plantio"
              value={1128}
              prefix={<LikeOutlined />}
            />
            <Statistic
              title="Defensivos"
              value={1128}
              prefix={<MedicineBoxOutlined />}
            />
          </div>
        </div>

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
