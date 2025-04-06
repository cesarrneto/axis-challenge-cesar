import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Input, Button, Card, Typography, message } from "antd";
import api from "../../services/api";

const { Title } = Typography;

const CooperativaNewPage = () => {
  const [nome, setNome] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      await api.post("/cooperativa", { nome });
      message.success("Cooperativa cadastrada com sucesso!");
      navigate("/listacooperativa");
    } catch (error) {
      message.error("Erro ao cadastrar cooperativa.");
      console.error("Erro ao cadastrar cooperativa", error);
    }
  };

  return (
    <Card style={{ maxWidth: 500, margin: "auto", marginTop: 50, padding: 20 }}>
      <Title level={2} style={{ textAlign: "center" }}>Nova Cooperativa</Title>
      <Form layout="vertical" onFinish={handleSubmit}>
        <Form.Item label="Nome" required>
          <Input value={nome} onChange={(e) => setNome(e.target.value)} />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block style={{ backgroundColor: "#fe3f00", borderColor: "#fe3f00" }}>
            Salvar
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default CooperativaNewPage;
