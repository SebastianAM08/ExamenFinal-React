import { useNavigate, useLocation } from 'react-router-dom';

const BOTONES = [
  { texto: 'Inicio', ruta: '/', exacta: true },
  { texto: 'Vitrina', ruta: '/catalogo', exacta: false },
  { texto: 'Mi canasta', ruta: '/compras', exacta: true },
  { texto: 'Mi pedido', ruta: '/compras/resumen', exacta: true },
];

function Navbar() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const estaActivo = (boton) =>
    boton.exacta ? pathname === boton.ruta : pathname.startsWith(boton.ruta);

  return (
    <nav className="bg-primario-oscuro px-4 py-2.5" aria-label="Navegacion principal">
      <div className="max-w-6xl mx-auto flex flex-wrap justify-center gap-2">
        {BOTONES.map((boton) => {
          const activo = estaActivo(boton);
          return (
            <button
              key={boton.ruta}
              type="button"
              onClick={() => navigate(boton.ruta)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition active:scale-95 focus-visible:outline-2 focus-visible:outline-acento cursor-pointer ${
                activo
                  ? 'bg-acento text-texto shadow-sm'
                  : 'text-white/90 hover:bg-primario hover:text-white'
              }`}
            >
              {boton.texto}
            </button>
          );
        })}
      </div>
    </nav>
  );
}

export default Navbar;
