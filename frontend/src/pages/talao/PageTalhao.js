import React from "react";
import { PageHeader, Button, Card } from "antd";

const TalhaoPage = () => (
  <>
    <PageHeader
      className="site-page-header"
      onBack={() => null}
      title="Talão"
      subTitle="Cadastro de talão"
      extra={[
        <Button key="3">Operation</Button>,
        <Button key="2">Operation</Button>,
        <Button key="1" type="primary">
          Primary
        </Button>,
      ]}
    />
    <Card>
      <p>Card content</p>
      <p>Card content</p>
      <p>Card content</p>
    </Card>
  </>
);

export default TalhaoPage;