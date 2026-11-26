import { Routes, Route } from 'react-router-dom';

import Layout from './layouts/Layout.jsx';
import SectionCatalogo from './sections/SectionCatalogo.jsx';
import SectionCompras from './sections/SectionCompras.jsx';

import Inicio from './pages/Inicio.jsx';
import ProductosAxios from './pages/ProductosAxios.jsx';
import ProductosFetch from './pages/ProductosFetch.jsx';
import Carrito from './pages/Carrito.jsx';
import Resumen from './pages/Resumen.jsx';
import NoEncontrado from './pages/NoEncontrado.jsx';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Inicio />} />

        <Route path="catalogo" element={<SectionCatalogo/>}>
          <Route index element={<ProductosAxios />} />
          <Route path="fetch" element={<ProductosFetch />} />
        </Route>

        <Route path="compras" element={<SectionCompras />}>
          <Route index element={<Carrito />} />
          <Route path="resumen" element={<Resumen />} />
        </Route>
        
        <Route path="*" element={<NoEncontrado />} />
      </Route>
    </Routes>
  );
}

export default App;
