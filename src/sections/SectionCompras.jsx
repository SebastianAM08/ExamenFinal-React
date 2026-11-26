import { NavLink, Outlet } from 'react-router-dom';

import banner from '../assets/banner-coleccion.svg';
import { useCarritoStore } from '../store/UseCarritoStore';

function SectionCompras() {
  const distintos = useCarritoStore((state) => state.items.length);

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
        alt="Portada Carrito"
        className="w-full h-36 md:h-44 object-cover"
      />

      <div className="flex flex-wrap gap-2 px-6 border-b border-gray-200">
        <NavLink to="/compras" end className={clasePestana}>
          Canasta ({distintos})
        </NavLink>
        <NavLink to="/compras/resumen" className={clasePestana}>
          Resumen
        </NavLink>
      </div>

      <div className="p-6">
        <Outlet />
      </div>
    </section>
  );
}

export default SectionCompras;
