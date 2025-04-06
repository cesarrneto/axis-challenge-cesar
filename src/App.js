import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ConfigProvider } from "antd";
import ptBR from "antd/es/locale/pt_BR";

import CooperadoListPage from "./pages/List/CooperadoListPage";
import CooperadoEditPage from "./pages/Edit/CooperadoEditPage";
import CooperadoNewPage from "./pages/New/CooperadoNewPage";

import CooperativaListPage from "./pages/List/CooperativaListPage";
import CooperativaEditPage from "./pages/Edit/CooperativaEditPage";
import CooperativaNewPage from "./pages/New/CooperativaNewPage";

import ContatoFavoritoEditPage from "./pages/Edit/ContatoFavoritoEditPage";
import ContatoFavoritoNewPage from "./pages/New/ContatoFavoritoNewPage";
import ContatoFavoritoListPage from "./pages/List/ContatoFavoritoListPage";

import LayoutComponent from "./components/LayoutComponent";
import HomePage from "./pages/HomePage";

const App = () => {
  return (
    <ConfigProvider locale={ptBR}>
    <Router>
      <Routes>
        <Route path="/" element={<LayoutComponent />}>
          <Route index element={<HomePage />} />
          <Route path="listacooperado" element={<CooperadoListPage />} />
          <Route path="cooperado/novo" element={<CooperadoNewPage />} />
          <Route path="cooperado/edit/:id" element={<CooperadoEditPage />} />

          <Route path="listacooperativa" element={<CooperativaListPage />} />
          <Route path="cooperativa/nova" element={<CooperativaNewPage />} />
          <Route path="cooperativa/edit/:id" element={<CooperativaEditPage />} />

          <Route path="listacontatofavorito" element={<ContatoFavoritoListPage />} />
          <Route path="contatofavorito/novo" element={<ContatoFavoritoNewPage />} />
          <Route path="contatofavorito/edit/:id" element={<ContatoFavoritoEditPage />} />
        </Route>
      </Routes>
    </Router>
    </ConfigProvider>
  );
};

export default App;
