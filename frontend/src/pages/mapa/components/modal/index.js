import React, { useState } from 'react';
import {
    Row,
    Col,
    Image,
    Form,
    Input,
    Button,
    Radio,
    Select,
    Cascader,
    DatePicker,
    InputNumber,
    TreeSelect,
    Switch,
    Collapse,
    List,
} from 'antd';

const { Panel } = Collapse;

function callback(key) {
    console.log(key);
}

const FormSizeDemo = ({ detalhe }) => {
    console.log('detalhe', detalhe);
    const [detalheTalhao, setDetalhe] = useState(detalhe);
    const [componentSize, setComponentSize] = useState('middle');
    const onFormLayoutChange = ({ size }) => {
        setComponentSize(size);
    };

    return (
        <Collapse defaultActiveKey={['1']} onChange={callback}>
            {detalheTalhao.formularios.map((formulario) => (
                <Panel header={`${formulario.nome}`} key="1">
                    <Form
                        labelCol={{ span: 24 }}
                        wrapperCol={{ span: 24 }}
                        layout="vertical"
                        initialValues={{ size: componentSize }}
                        onValuesChange={onFormLayoutChange}
                        size={componentSize}
                    >
                        {formulario.itens.map((itemFomulario) => (
                            <>

                                {itemFomulario.tipo === 'text' &&
                                    <Form.Item label={itemFomulario.pergunta}>
                                        <Input disabled value={itemFomulario.valor} />
                                    </Form.Item>
                                }
                                {itemFomulario.tipo === 'select' &&
                                    <Form.Item label={itemFomulario.pergunta}>
                                        <Input disabled value={itemFomulario.valor} />
                                    </Form.Item>
                                }
                                {itemFomulario.tipo === 'multiselect' &&
                                    <Form.Item label={itemFomulario.pergunta}>
                                        <List
                                            bordered
                                            dataSource={itemFomulario.alternativas}
                                            renderItem={item => (
                                                <List.Item>{item}</List.Item>
                                            )}
                                        />
                                    </Form.Item>
                                }
                            </>
                        ))}
                        <Row gutter={[21, 21]}>
                            <Col span={8} >
                                <Image
                                    width={200}
                                    src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                                />
                            </Col>
                            <Col span={8} >
                                <Image
                                    width={200}
                                    src="https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg"
                                />
                            </Col>
                            <Col span={8} >
                                <Image
                                    width={200}
                                    src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"
                                />
                            </Col>
                            <Col span={8} >
                                <Image
                                    width={200}
                                    src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"
                                />
                            </Col>
                        </Row>
                    </Form>
                </Panel>
            ))}
        </Collapse>
    );
};

export default FormSizeDemo;