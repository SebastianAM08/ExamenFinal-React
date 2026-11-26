import { NavLink, Outlet } from 'react-router-dom';

import banner from '../assets/banner-explorar.svg';

function SectionCatalogo() {
  const clasePestana = ({ isActive }) =>
    `px-4 py-3 text-sm font-semibold border-b-3 transition ${
      isActive
        ? 'border-primario text-primario'
        : 'border-transparent text-gray-500 hover:text-primario'
    }`;

  return (
    <section className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <img
        src={banner}
        alt="Portada Productos"
        className="w-full h-36 md:h-44 object-cover"
      />

      <div className="flex flex-wrap gap-2 px-6 border-b border-gray-200">
        <NavLink to="/catalogo" end className={clasePestana}>
          Catalago con Axios
        </NavLink>
        <NavLink to="/catalogo/fetch" className={clasePestana}>
          Catalogo con Fetch
        </NavLink>
      </div>

      <div className="p-6">
        <Outlet />
      </div>
    </section>
  );
}

export default SectionCatalogo;
