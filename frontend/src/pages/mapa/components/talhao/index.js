import React, { useState } from 'react';
import {
    Form,
    Input,
} from 'antd';

const Talhao = ({ setValues, layer }) => {
    const [nomeTalhao, setNomeTalhao] = useState("");
    const [numeroTalhao, setNumeroTalhao] = useState("");

    const handleChange = () => {
        setValues({
            'nome': nomeTalhao,
            'numero': numeroTalhao,
            'layer': layer
        })
    };

    return (
        <Form
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            layout="vertical"
        >
            <Form.Item label={'Nome'}>
                <Input label="nome"
                    name="nome"
                    value={nomeTalhao}
                    onChange={(e) => { setNomeTalhao(e.currentTarget.value); handleChange() }} />
            </Form.Item>
            <Form.Item label={'Número'}>
                <Input label="numero"
                    name="numero"
                    value={numeroTalhao}
                    onChange={(e) => { setNumeroTalhao(e.currentTarget.value); handleChange() }} />
            </Form.Item>
        </Form>
    );
};

export default Talhao;