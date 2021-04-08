import React from "react";
import { PageHeader, Button, Card, Form, Input } from "antd";
import { UserOutlined, LockOutlined } from '@ant-design/icons';

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 32 },
};
const tailLayout = {
  wrapperCol: { offset: 0, span: 32 },
};

const LoginPage = () => (
  <>
    {/* <PageHeader
      className="site-page-header"
      onBack={() => null}
      title="Login"
      subTitle="Login"
      extra={[
        <Button key="3">Operation</Button>,
        <Button key="2">Operation</Button>,
        <Button key="1" type="primary">
          Primary
        </Button>,
      ]}
    /> */}
    <Card className="login-form" title="Login">
        <Form {...layout}>
          <Form.Item
          name="username"
          rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input size="large" placeholder="Email" prefix={<UserOutlined />}/>
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password size="large" placeholder="Senha" prefix={<LockOutlined />}/>
          </Form.Item>

          <Form.Item {...tailLayout}>
            <Button size="large" type="primary" htmlType="submit" className="button-login">
              Entrar
            </Button>
          </Form.Item>

          <Form.Item {...tailLayout}>
            <Button size="large"  htmlType="submit" className="button-login">
              Cadastrar
            </Button>
          </Form.Item>
        
        </Form>
    </Card>
  </>
);

export default LoginPage;