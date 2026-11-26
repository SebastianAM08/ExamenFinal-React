import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import logo from '../assets/logo.svg';
import { useCarritoStore } from '../store/UseCarritoStore';

function Header() {
  const navigate = useNavigate();

  const totalUnidades = useCarritoStore((state) =>
    state.items.reduce((acc, item) => acc + item.cantidad, 0)
  );

  useEffect(() => {
    document.title =
      totalUnidades > 0 ? `(${totalUnidades}) Evidencia Final` : 'Evidencia Final';
  }, [totalUnidades]);

  return (
    <header className="bg-primario text-white shadow-md">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between gap-4">
        <div
          onClick={() => navigate('/')}
          className="flex items-center gap-3 cursor-pointer"
        >
          <img src={logo} alt="Logo Evidencia Final" className="w-11 h-11 rounded-lg" />
          <div>
            <h1 className="text-xl md:text-2xl font-bold leading-tight">MercaCauca</h1>
            <p className="hidden sm:block text-xs md:text-sm text-white/80">
              Tu mercado en linea Caucana
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => navigate('/compras')}
          className="relative flex items-center gap-2 bg-primario-oscuro hover:bg-black/25 active:scale-95 focus-visible:outline-2 focus-visible:outline-acento px-4 py-2.5 rounded-lg font-semibold text-sm transition cursor-pointer"
        >
          <span>Carrito</span>
          <span className="bg-secundario text-white text-xs font-bold px-2 py-0.5 rounded-full">
            {totalUnidades}
          </span>
        </button>
      </div>
    </header>
  );
}

export default Header;
