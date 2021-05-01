import React, { useEffect, useState } from "react";
import { List } from 'antd';
import api from '../../http/api';

const PageSelecionar = ({ history }) => {
  const [fazendas, setFazendas] = useState([]);

  useEffect(() => {
    const load = async () => {
      const { data } = await api.get(`/fazenda`);
      setFazendas(data)
    };
    load()
  }, []);

  const handleSelecione = (fazenda_id) => {
    history.push(`/mapa/${fazenda_id}`);
  };

  return (
    <>
      <List
        size="large"
        bordered
        dataSource={fazendas}
        renderItem={item =>
          <List.Item onClick={() => handleSelecione(item.id)}>{item.nome}</List.Item>
        }
      />
    </>
  )
}

export default PageSelecionar;