import { useNavigate } from 'react-router-dom';

import { useCarritoStore } from '../store/UseCarritoStore';
import { formatearPrecio } from '../util/normalizar';

function Carrito() {
  const navigate = useNavigate();

  const items = useCarritoStore((state) => state.items);
  const sumarCantidad = useCarritoStore((state) => state.sumarCantidad);
  const restarCantidad = useCarritoStore((state) => state.restarCantidad);
  const eliminarItem = useCarritoStore((state) => state.eliminarItem);

  if (items.length === 0) {
    return (
      <div className="py-10 text-center space-y-4">
        <p className="text-gray-600 text-lg">
          Tu Canasta esta vacia por ahora.
        </p>
        <button
          type="button"
          onClick={() => navigate('/catalogo')}
          className="bg-primario hover:bg-primario-oscuro text-white font-semibold px-5 py-2.5 rounded-lg transition cursor-pointer"
        >
          Explorar Vitrina
        </button>
      </div>
    );
  }

  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li
          key={item.id}
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 border border-gray-200 rounded-xl bg-white"
        >
          <div className="flex items-center gap-4 min-w-0">
            {item.imagen ? (
              <img
                src={item.imagen}
                alt={item.titulo}
                className="w-16 h-16 object-contain rounded-lg bg-gray-50 p-1 shrink-0"
              />
            ) : (
              <div className="w-16 h-16 rounded-lg bg-primario-suave text-primario-oscuro font-bold flex items-center justify-center shrink-0">
                {item.titulo.slice(0, 2).toUpperCase()}
              </div>
            )}

            <div className="min-w-0">
              <h3 className="font-bold text-texto truncate">{item.titulo}</h3>
              <p className="text-xs uppercase font-semibold text-secundario">
                {item.subtitulo}
              </p>
              {item.extra && (
                <p className="text-sm text-gray-600">
                  {true ? `${formatearPrecio(item.precio)} c/u` : item.extra}
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between sm:justify-end gap-4">
            {true && (
              <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                <button
                  type="button"
                  onClick={() => restarCantidad(item.id)}
                  className="px-3 py-1.5 bg-gray-100 hover:bg-primario-suave font-bold cursor-pointer"
                  aria-label="Restar"
                >
                  -
                </button>
                <span className="px-3 py-1.5 font-semibold text-sm">
                  {item.cantidad}
                </span>
                <button
                  type="button"
                  onClick={() => sumarCantidad(item.id)}
                  className="px-3 py-1.5 bg-gray-100 hover:bg-primario-suave font-bold cursor-pointer"
                  aria-label="Sumar"
                >
                  +
                </button>
              </div>
            )}

            {true && true && (
              <p className="font-bold text-primario min-w-24 text-right">
                {formatearPrecio(item.precio * item.cantidad)}
              </p>
            )}

            <button
              type="button"
              onClick={() => eliminarItem(item.id)}
              className="px-3.5 py-2 rounded-lg text-sm font-semibold bg-red-100 text-red-700 hover:bg-red-600 hover:text-white transition cursor-pointer"
            >
              Eliminar
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default Carrito;
