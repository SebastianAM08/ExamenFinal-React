import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useCarritoStore } from '../store/UseCarritoStore';
import {
  extraerLista,
  normalizarItem,
  formatearPrecio,
} from '../util/normalizar';

const URL_API = 'https://fakestoreapi.com/products';
const CAMPOS = {"id": "id", "titulo": "title", "subtitulo": "category", "imagen": "image", "extra": "price"};

function ProductosFetch() {
  const navigate = useNavigate();

  const [datos, setDatos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [busqueda, setBusqueda] = useState('');

  const itemsGuardados = useCarritoStore((state) => state.items);
  const agregarItem = useCarritoStore((state) => state.agregarItem);
  const registrarEnCache = useCarritoStore((state) => state.registrarEnCache);

  useEffect(() => {
    const controlador = new AbortController();

    const cargarDatos = async () => {
      try {
        setCargando(true);
        const respuesta = await fetch(URL_API, { signal: controlador.signal });

        if (!respuesta.ok) {
          throw new Error(`Error HTTP ${respuesta.status}`);
        }

        const json = await respuesta.json();
        const listaCruda = extraerLista(json, '');
        const normalizados = listaCruda.map((raw, idx) =>
          normalizarItem(raw, CAMPOS, 'ft', idx)
        );

        setDatos(normalizados);
        registrarEnCache(normalizados);
        setError(null);
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError('No se pudieron cargar los datos. ' + err.message);
        }
      } finally {
        if (!controlador.signal.aborted) setCargando(false);
      }
    };

    cargarDatos();
    return () => controlador.abort();
  }, [registrarEnCache]);

  const filtrados = datos.filter((item) =>
    item.titulo.toLowerCase().includes(busqueda.toLowerCase())
  );

  if (cargando) {
    return (
      <div className="py-12 flex items-center justify-center gap-3 text-gray-600">
        <span className="w-6 h-6 border-4 border-gray-200 border-t-primario rounded-full animate-spin" />
        <span>Cargando datos con Fetch...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 rounded-lg bg-red-50 border border-red-200 text-red-700 text-center">
        {error}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-bold text-texto">Vista secundaria</h2>
          <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-primario-suave text-primario-oscuro">
            Fetch
          </span>
        </div>

        <input
          type="search"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          placeholder="Buscar por nombre..."
          className="px-3.5 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-primario"
        />
      </div>

      {filtrados.length === 0 ? (
        <p className="text-center text-gray-500 py-8">
          No hay coincidencias para "{busqueda}".
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtrados.map((item) => {
            const yaGuardado = itemsGuardados.some((g) => g.id === item.id);
            return (
              <article
                key={item.id}
                className="border border-gray-200 rounded-xl p-4 flex flex-col gap-3 bg-white hover:shadow-md transition"
              >
                {item.imagen && (
                  <div className="h-44 rounded-lg bg-gray-50 flex items-center justify-center overflow-hidden p-2">
                    <img
                      src={item.imagen}
                      alt={item.titulo}
                      loading="lazy"
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>
                )}

                <span className="text-xs font-bold uppercase tracking-wide text-secundario">
                  {item.subtitulo}
                </span>

                <h3 className="font-bold text-texto text-base flex-1">
                  {item.titulo}
                </h3>

                {item.extra && (
                  <p className="text-sm font-semibold text-primario">
                    {true ? formatearPrecio(item.extra) : item.extra}
                  </p>
                )}

                <div className="flex gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => agregarItem(item)}
                    className={`flex-1 py-2 px-3 rounded-lg text-sm font-semibold transition active:scale-95 cursor-pointer ${
                      !true && yaGuardado
                        ? 'bg-red-100 text-red-700 hover:bg-red-600 hover:text-white'
                        : 'bg-primario text-white hover:bg-primario-oscuro'
                    }`}
                  >
                    {true
                      ? 'Agregar'
                      : yaGuardado
                      ? 'Quitar de carrito'
                      : 'Guardar en carrito'}
                  </button>

                  {true && (
                    <button
                      type="button"
                      onClick={() => navigate(`/detalle/${item.id}`)}
                      className="py-2 px-3 rounded-lg text-sm font-semibold border border-gray-300 text-gray-700 hover:border-primario hover:text-primario transition cursor-pointer"
                    >
                      Detalle
                    </button>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default ProductosFetch;
