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
            zIndex: 1,
            width: "100%",
          }}
        >
          <div className="layout-logo">
            {/* <img className="logo" src={logo} width="32" height="32" alt="Logo"/> */}
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
