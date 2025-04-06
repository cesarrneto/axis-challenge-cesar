import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Table, Input, Select, Button, Card, Space, Typography, message, Popconfirm } from "antd";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import api from "../../services/api";

const { Title } = Typography;
const { Search } = Input;
const { Option } = Select;

const ContatoFavoritoListPage = () => {
  const { cooperadoId } = useParams();
  const [contatosFavoritos, setContatosFavoritos] = useState([]);
  const [cooperados, setCooperados] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [contatosRes, cooperadosRes] = await Promise.all([
          api.get(`/contatofavorito${cooperadoId ? `?cooperadoId=${cooperadoId}` : ""}`),
          api.get("/cooperado"),
        ]);
        setContatosFavoritos(contatosRes.data);
        setCooperados(cooperadosRes.data);
      } catch (error) {
        message.error("Erro ao buscar dados.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [cooperadoId]);

  const handleDelete = async (id) => {
    try {
      await api.delete(`/contatofavorito/${id}`);
      setContatosFavoritos((prev) => prev.filter((fav) => fav.id !== id));
      message.success("Contato excluído com sucesso.");
    } catch (error) {
      message.error("Erro ao excluir contato.");
    }
  };

  const getCooperadoNome = (id) => {
    const cooperado = cooperados.find((coop) => coop.id === id);
    return cooperado ? cooperado.nome : "Desconhecido";
  };

  const filteredData = contatosFavoritos.filter((fav) =>
    fav.nome.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Card style={{ maxWidth: 800, margin: "auto", marginTop: 20, padding: 20 }}>
      <Title level={3} style={{ textAlign: "center" }}>Lista de Contatos Favoritos</Title>
      <Space style={{ marginBottom: 16, display: "flex", justifyContent: "space-between" }}>
        <Search
          placeholder="Buscar por nome..."
          allowClear
          onSearch={(value) => setSearchTerm(value)}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ width: 250 }}
        />
        <Select value={itemsPerPage} onChange={setItemsPerPage} style={{ width: 120 }}>
          <Option value={5}>5</Option>
          <Option value={10}>10</Option>
          <Option value={20}>20</Option>
        </Select>
        <Link to="/contatofavorito/novo">
          <Button type="primary" icon={<PlusOutlined />} style={{ backgroundColor: "#fe3f00", borderColor: "#fe3f00" }}>
            Adicionar Contato
          </Button>
        </Link>
      </Space>

      <Table
        columns={[
          {
            title: "Nome",
            dataIndex: "nome",
            key: "nome",
          },
          {
            title: "PIX",
            dataIndex: "chavePix",
            key: "chavePix",
            render: (text, record) => `${record.tipoChavePix}: ${text}`,
          },
          {
            title: "Cooperado",
            dataIndex: "cooperadoId",
            key: "cooperadoId",
            render: (id) => getCooperadoNome(id),
          },
          {
            title: "Ações",
            key: "actions",
            render: (_, record) => (
              <Space>
                <Link to={`/contatofavorito/edit/${record.id}`}>
                  <Button type="primary" icon={<EditOutlined />} style={{ backgroundColor: "#fe3f00", borderColor: "#fe3f00" }}>
                    Editar
                  </Button>
                </Link>
                <Popconfirm
                  title="Tem certeza que deseja excluir?"
                  onConfirm={() => handleDelete(record.id)}
                  okText="Sim"
                  cancelText="Não"
                >
                  <Button danger icon={<DeleteOutlined />}>Excluir</Button>
                </Popconfirm>
              </Space>
            ),
          },
        ]}
        dataSource={filteredData}
        rowKey={(record) => record.id || Math.random()}
        pagination={{ pageSize: itemsPerPage, current: currentPage, onChange: setCurrentPage }}
        loading={loading}
      />
    </Card>
  );
};

export default ContatoFavoritoListPage;