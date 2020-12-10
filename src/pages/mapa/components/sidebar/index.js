import React from 'react';
import axios from 'axios';
import { Button, List, Collapse, Card, Typography } from 'antd';
import { SERVER } from '../../Constants';
import './sidebar.css';
import talhao from 'assets/talhao.png';

const { Panel } = Collapse;
const { Title, Text } = Typography;
const { Meta } = Card;

const CardItem = item => {
  const { properties } = item.feature;
  const onClickItem = async () => {
    await axios.delete(`${SERVER}/talhao/${properties.id}`);
  };
  return (
    <Card
      style={{ width: '100%' }}
      cover={<img width={200} height={150} alt="example" src={talhao} />}
    >
      <Meta
        title={
          <>
            <Button danger onClick={onClickItem}>
              <i className="fas fa-times"></i>
            </Button>
            <Text style={{ marginLeft: '10px' }} strong>
              Talhão:
            </Text>
            <span>{properties.nome}</span>
          </>
        }
      />
    </Card>
  );
};

export const MapPainel = ({ painel, onClickItem, talhoes }) => {
  console.log(talhoes);

  return (
    <div className="painel-content">
      <List
        header={
          <div className="header-painel">
            <Title level={4} className="header-painel-item">
              Talhões cadastrados
            </Title>{' '}
            <Button danger onClick={onClickItem}>
              <i className="fas fa-times"></i>
            </Button>
          </div>
        }
        size="small"
        bordered
        dataSource={talhoes}
        renderItem={item => <List.Item>{CardItem(item)}</List.Item>}
      />
    </div>
  );
};

const SideBar = ({ onClickItem }) => {
  return (
    <div id="sidebar" className={`sidebar sidebar-left`}>
      <div className="sidebar-tabs">
        <Button
          type="default"
          icon={<i className="fab fa-envira"></i>}
          size={'large'}
          className={'sidebar-button-margin-bottom'}
          onClick={onClickItem}
        />
        <Button
          type="default"
          icon={<i className="fas fa-layer-group"></i>}
          size={'large'}
          className={'sidebar-button-margin-bottom'}
          onClick={onClickItem}
        />
        <Button
          type="default"
          icon={<i className="fas fa-filter"></i>}
          size={'large'}
          className={'sidebar-button-margin-bottom'}
          onClick={onClickItem}
        />
      </div>
    </div>
  );
};

export default SideBar;
