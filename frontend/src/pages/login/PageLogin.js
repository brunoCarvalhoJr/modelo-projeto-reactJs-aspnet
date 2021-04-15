import React, { useState } from "react";
import { Button, Card, Form, Input } from "antd";
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useAuth } from '../../contexts/auth';

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 32 },
};
const tailLayout = {
  wrapperCol: { offset: 0, span: 32 },
};

const LoginPage = ({ history }) => {
  const { signIn } = useAuth();
  const [username, setUsername] = useState('marcossbello222@gmail.com');
  const [password, setPassword] = useState('12345678');

  function handleSign() {
    signIn();
    history.push("/home");
  }

  return (
    <>
      <Card className="login-form" title="Login">
        <Form {...layout}>
          <Form.Item
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input size="large" placeholder="Email" prefix={<UserOutlined />} />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password size="large" placeholder="Senha" prefix={<LockOutlined />} />
          </Form.Item>

          <Form.Item {...tailLayout}>
            <Button size="large" type="primary" htmlType="submit" className="button-login" onClick={handleSign}>
              Entrar
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </>
  )
};

export default LoginPage;