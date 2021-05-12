import React, { useState, useEffect } from 'react';
import { PageHeader, Select, Button, Layout, Table, Space } from 'antd';
import api from '../../http/api';

const { Content } = Layout;
const { Option } = Select;
const { Column } = Table;

const PageTablePergunta = ({ history }) => {
  const [perguntas, setPerguntas] = useState([]);
  useEffect(() => {
    const load = async () => {
      const { data } = await api.get(`/pergunta`);
      setPerguntas(data)
    };
    load()
  }, []);

  const onCadastrar = () => {
    history.push('/pergunta/cadastrar');
  }

  const onEditar = async (item) => {
    history.push(`/pergunta/editar/${item.id}`);
  }

  const onDeletar = async (item) => {
    await api.delete(`/pergunta/${item.id}`);
    window.location.reload();
  }

  return (
    <PageHeader
      ghost={false}
      title="Perguntas"
      extra={[
        <Button key="1" type="primary" onClick={onCadastrar}>
          Cadastrar
        </Button>,
      ]}
    >
      <Content style={{ padding: '0 10%' }}>
        <Table dataSource={perguntas} >
          <Column title="Ocorrência" dataIndex="ocorrencia" key="ocorrencia" />
          <Column title="Nome" dataIndex="nome" key="nome" />
          <Column title="Tipo" dataIndex="tipo" key="tipo" />
          <Column title="Ordem" dataIndex="ordem" key="ordem" />
          <Column
            title="Ações"
            key="action"
            render={(text, record) => (
              <Space size="middle">
                <a onClick={() => onEditar(record)}>Editar</a>
                <a onClick={() => onDeletar(record)}>Deletar</a>
              </Space>
            )}
          />
        </Table>
      </Content>
    </PageHeader>
  )
}

export default PageTablePergunta;