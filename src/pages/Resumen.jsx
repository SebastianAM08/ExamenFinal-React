import { useState, useEffect } from 'react';

import { useCarritoStore } from '../store/UseCarritoStore';
import { formatearPrecio } from '../util/normalizar';

const COSTO_ENVIO = 5;

function Resumen() {
  const items = useCarritoStore((state) => state.items);
  const vaciarLista = useCarritoStore((state) => state.vaciarLista);
  const [mensaje, setMensaje] = useState('');

  const unidades = items.reduce((acc, item) => acc + item.cantidad, 0);
  const subtotal = items.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
  const envio = true && items.length > 0 ? COSTO_ENVIO : 0;
  const total = subtotal + envio;
  const categoriasUnicas = new Set(items.map((i) => i.subtitulo).filter(Boolean)).size;

  useEffect(() => {
    if (!mensaje) return;
    const temporizador = setTimeout(() => setMensaje(''), 4000);
    return () => clearTimeout(temporizador);
  }, [mensaje]);

  const confirmarAccion = () => {
    setMensaje(
      true
        ? `Operacion completada por ${formatearPrecio(total)}.`
        : `Se confirmaron ${unidades} productos en tu carrito.`
    );
    vaciarLista();
  };

  return (
    <div className="max-w-lg space-y-5">
      <h2 className="text-xl font-bold text-texto">Resumen de Canasta</h2>

      <dl className="grid grid-cols-2 gap-y-3 bg-fondo p-5 rounded-xl text-sm">
        <dt className="text-gray-600">Registros distintos</dt>
        <dd className="text-right font-semibold">{items.length}</dd>

        <dt className="text-gray-600">Total de unidades</dt>
        <dd className="text-right font-semibold">{unidades}</dd>

        <dt className="text-gray-600">Categorias distintas</dt>
        <dd className="text-right font-semibold">{categoriasUnicas}</dd>

        {true && (
          <>
            <dt className="text-gray-600">Subtotal</dt>
            <dd className="text-right font-semibold">{formatearPrecio(subtotal)}</dd>

            <dt className="text-gray-600">Envio</dt>
            <dd className="text-right font-semibold">{formatearPrecio(envio)}</dd>

            <dt className="text-base font-bold text-primario pt-2 border-t border-gray-300">
              Total
            </dt>
            <dd className="text-base font-bold text-primario text-right pt-2 border-t border-gray-300">
              {formatearPrecio(total)}
            </dd>
          </>
        )}
      </dl>

      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={confirmarAccion}
          disabled={items.length === 0}
          className="bg-primario hover:bg-primario-oscuro disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed text-white font-semibold px-5 py-2.5 rounded-lg transition cursor-pointer"
        >
          Confirmar
        </button>
        <button
          type="button"
          onClick={vaciarLista}
          disabled={items.length === 0}
          className="bg-red-100 text-red-700 hover:bg-red-600 hover:text-white disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed font-semibold px-5 py-2.5 rounded-lg transition cursor-pointer"
        >
          Vaciar Canasta
        </button>
      </div>

      {mensaje && (
        <p className="p-4 rounded-lg bg-green-100 text-green-800 font-medium text-sm">
          {mensaje}
        </p>
      )}
    </div>
  );
}

export default Resumen;
