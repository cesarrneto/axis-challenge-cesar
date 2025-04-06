import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Form, Input, Button, Card, Typography, message } from "antd";
import api from "../../services/api";

const { Title } = Typography;

const CooperativaEditPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCooperativa = async () => {
      try {
        const response = await api.get(`/cooperativa/${id}`);
        form.setFieldsValue({ nome: response.data.nome });
      } catch (error) {
        message.error("Erro ao buscar cooperativa.");
        console.error("Erro ao buscar cooperativa", error);
      }
    };

    fetchCooperativa();
  }, [id, form]);

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      await api.put(`/cooperativa/${id}`, values);
      message.success("Cooperativa atualizada com sucesso!");
      navigate("/listacooperativa");
    } catch (error) {
      message.error("Erro ao atualizar cooperativa.");
      console.error("Erro ao atualizar cooperativa", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card style={{ maxWidth: 500, margin: "auto", marginTop: 50 }}>
      <Title level={3}>Editar Cooperativa</Title>
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Form.Item label="Nome" name="nome" rules={[{ required: true, message: "Por favor, insira o nome" }]}>
          <Input />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} block>
            Salvar Alterações
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default CooperativaEditPage;
