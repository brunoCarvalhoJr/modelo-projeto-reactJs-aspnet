import React, { useState } from "react";
import { Button, List, Collapse, Card, Typography } from "antd";
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import "./sidebar.scss";
import talhao from "assets/talhao.png";

const { Panel } = Collapse;
const { Title, Text } = Typography;
const { Meta } = Card;

const teste = ({ data, onClickItem }) => (
  <div class="sidebar-pane active" id="home">
    <h1 class="sidebar-header">
      Camadas
      <span class="sidebar-close">
        <i class="fa fa-caret-left"></i>
      </span>
    </h1>
    <div>
      <Collapse defaultActiveKey={["1"]}>
        <Panel header="Áreas federação" key="1">
          <List
            size="small"
            dataSource={data}
            renderItem={(item) => (
              <List.Item>
                <List.Item.Meta title={item} onClick={onClickItem} />
                <i class="fas fa-eye"></i>
              </List.Item>
            )}
          />
        </Panel>
      </Collapse>
      <div className={"filtrar"}>
        <Button type="primary" block>
          Pesquisar
        </Button>
      </div>
    </div>
  </div>
);

const CardItem = () => {
  return (
    <Card
      style={{ width: "100%" }}
      cover={<img width={200} height={150} alt="example" src={talhao} />}
    >
      <Meta
        title={
          <>
            <Text strong>Talhão:</Text>
            <span>T0001</span>
          </>
        }
      />
    </Card>
  );
};

export const MapPainel = ({ painel, onClickItem }) => {
  return (
    <div class="painel-content">
      <List
        header={
          <div className="header-painel">
            <Title level={4} className="header-painel-item">
              Talhões cadastrados
            </Title>{" "}
            <Button shape="circle" danger onClick={onClickItem}>
              <i class="fas fa-times"></i>
            </Button>
          </div>
        }
        size="small"
        bordered
        dataSource={["t", "dd", "paulo", "vieira"]}
        renderItem={(item) => <List.Item>{CardItem()}</List.Item>}
      />
    </div>
  );
};

const SideBar = ({ onClickItem }) => {
  return (
    <div id="sidebar" className={`sidebar sidebar-left`}>
      <div class="sidebar-tabs">
        <Button
          type="default"
          icon={<i class="fab fa-envira"></i>}
          size={"large"}
          className={"sidebar-button-margin-bottom"}
          onClick={onClickItem}
        />
        <Button
          type="default"
          icon={<i class="fas fa-layer-group"></i>}
          size={"large"}
          className={"sidebar-button-margin-bottom"}
          onClick={onClickItem}
        />
        <Button
          type="default"
          icon={<i class="fas fa-filter"></i>}
          size={"large"}
          className={"sidebar-button-margin-bottom"}
          onClick={onClickItem}
        />
      </div>
    </div>
  );
};

export default SideBar;
