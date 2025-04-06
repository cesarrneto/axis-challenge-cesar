import React from "react";
import { Layout, Menu } from "antd";
import { Link, Outlet } from "react-router-dom";
import {
  HomeOutlined,
  TeamOutlined,
  BankOutlined,
  StarOutlined,
} from "@ant-design/icons";

import Logo from "../images/axis-mobfintek-logo.png"

const { Header, Content } = Layout;

const LayoutComponent = () => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header style={{ background: "#fe3f00", display: "flex", alignItems: "center", padding: "0 20px" }}>
        <div style={{ display: "flex", alignItems: "center", marginRight: "20px" }}>
          <img
            src={Logo}
            alt="Logo"
            style={{ height: "50px", width: "auto" }}
          />
        </div>
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["1"]}
          style={{
            flex: 1,
            display: "flex",
            justifyContent: "center",
            backgroundColor: "#fe3f00",
          }}
        >
          <Menu.Item key="1" icon={<HomeOutlined />} style={{ transition: "background 0.3s" }}>
            <Link to="/">Início</Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<BankOutlined />} style={{ transition: "background 0.3s" }}>
            <Link to="/listacooperativa">Cooperativas</Link>
          </Menu.Item>
          <Menu.Item key="3" icon={<TeamOutlined />} style={{ transition: "background 0.3s" }}>
            <Link to="/listacooperado">Cooperados</Link>
          </Menu.Item>
          <Menu.Item key="4" icon={<StarOutlined />} style={{ transition: "background 0.3s" }}>
            <Link to="/listacontatofavorito">Contatos Favoritos</Link>
          </Menu.Item>
        </Menu>
      </Header>

      <Content style={{ padding: "20px" }}>
        <Outlet />
      </Content>

      {/* Adicionando CSS inline para o efeito hover */}
      <style>
        {`
          .ant-menu-dark .ant-menu-item:hover {
            background-color: #d63b00 !important;
          }
          .ant-menu-dark .ant-menu-item-selected {
            background-color: #d63b00 !important;
          }
        `}
      </style>
    </Layout>
  );
};

export default LayoutComponent;
