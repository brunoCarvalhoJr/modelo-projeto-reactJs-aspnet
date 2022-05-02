import React, { useState } from 'react';
import { Button, Card, Form, Input } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useAuth } from '../../contexts/auth';
import { withRouter } from 'react-router-dom';

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 32 },
};
const tailLayout = {
  wrapperCol: { offset: 0, span: 32 },
};

const LoginPage = ({ history }) => {
  const { signIn } = useAuth();
  const [username, setUsername] = useState('paulohenriquevn');
  const [password, setPassword] = useState('123456');

  function handleSign() {
    signIn(username, password);
    history.push(`/`);
  }

  return (
    <>
      <Card className="login-form" title="Login">
        <Form {...layout}>
          <Form.Item
            name="Usuário"
            rules={[
              { required: true, message: 'Campo usuario é obrigatório!' },
            ]}
          >
            <Input
              size="large"
              value={username}
              onChange={({ target }) => setUsername(target.value)}
              placeholder="Email"
              prefix={<UserOutlined />}
            />
          </Form.Item>

          <Form.Item
            name="Senha"
            rules={[{ required: true, message: 'Campo senha é obrigatório!' }]}
          >
            <Input.Password
              size="large"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
              placeholder="Senha"
              prefix={<LockOutlined />}
            />
          </Form.Item>
          <Form.Item {...tailLayout}>
            <Button
              size="large"
              type="primary"
              htmlType="submit"
              className="button-login"
              onClick={handleSign}
            >
              Entrar
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </>
  );
};

export default withRouter(LoginPage);
