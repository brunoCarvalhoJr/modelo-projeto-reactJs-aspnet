import React, { useState, useEffect } from 'react';
import { PageHeader, Select, Form, Input, Button, Layout, List } from 'antd';
import api from '../../http/api';

const { Content } = Layout;
const { Option } = Select;

const PageSelecionar = ({ history, match }) => {
  const [form] = Form.useForm();
  const [id, setId] = useState();
  const [alternativas, setAlternativas] = useState([]);
  const [textoAlternativa, setTextoAlternativa] = useState('');
  const [ocorrencias, setOcorrencias] = useState([]);
  const [tipos,] = useState([
    { id: 'text', nome: 'Texto' },
    { id: 'numeric', nome: 'Numérico' },
    { id: 'select', nome: 'Seleção' },
    { id: 'multiselect', nome: 'Multipla escolha' }])

  useEffect(() => {
    const load = async () => {
      const {
        params: { id }
      } = match;

      setId(id);
      const { data: values } = await api.get(`/pergunta/${id}`);
      form.setFieldsValue(values);
      const { data: ocorrencias } = await api.get(`/ocorrencia`);
      const { data: alternativas } = await api.get(`/alternativa`);
      setOcorrencias(ocorrencias)
      setAlternativas(alternativas)
    };
    load()
  }, []);

  const onFinish = async (values) => {
    values.alternativas = alternativas;
    await api.put(`/pergunta/${id}`, values)
  }

  const onAdicionarAlternativa = () => {
    alternativas.push({ nome: textoAlternativa });
    setTextoAlternativa('')
  }

  const onExcluirAlternativa = (alternativa) => {
    var index = alternativas.indexOf(alternativa);
    if (index > -1) {
      alternativas.splice(index, 1);
    }
    setAlternativas([...alternativas])
  }

  return (
    <PageHeader
      title="Perguntas"
      subTitle="Cadastro de pergunta"
      onBack={() => history.push('/pergunta/listar')}
    >
      <Content style={{ padding: '0 20%' }}>
        <Form
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
          layout={'vertical'}
          form={form}
          onFinish={onFinish}
        >
          <Form.Item name="nome" label="Nome">
            <Input placeholder="Digite o nome da pergunta" />
          </Form.Item>
          <Form.Item name="ordem" label="Ordem">
            <Input type={'number'} placeholder="Digite a ordem da pergunta" />
          </Form.Item>
          <Form.Item name="tipo" label="Tipo">
            <Select placeholder="Selecione">
              {tipos.map(tipo => (
                <Option key={tipo.id}>{tipo.nome}</Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="ocorrenciaId" label="Ocorrência">
            <Select placeholder="Selecione">
              {ocorrencias.map(ocorrencia => (
                <Option key={ocorrencia.id}>{ocorrencia.nome}</Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="Alternativa">
            <Input placeholder="Alternativa pergunta" value={textoAlternativa} onChange={(e) => { setTextoAlternativa(e.currentTarget.value) }} />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 22, span: 24 }}>
            <Button type="primary" htmlType="button" onClick={onAdicionarAlternativa}>Adicionar</Button>
          </Form.Item>
          <Form.Item label="Alternativas">
            <List
              size="large"
              bordered
              dataSource={alternativas}
              renderItem={item =>
                <List.Item actions={[<a onClick={() => onExcluirAlternativa(item)} key="list-loadmore-delete">Excluir</a>,]}>
                  {item.nome}
                </List.Item>
              }
            />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 22, span: 24 }}>
            <Button type="primary" htmlType="submit">Salvar</Button>
          </Form.Item>
        </Form>
      </Content>
    </PageHeader>
  )
}

export default PageSelecionar;