import { useNavigate } from 'react-router-dom';

import bannerExplorar from '../assets/banner-explorar.svg';
import bannerColeccion from '../assets/banner-coleccion.svg';

function Inicio() {
  const navigate = useNavigate();

  return (
    <section className="space-y-8">
      <div className="bg-white rounded-xl p-6 md:p-8 border border-gray-200 shadow-sm text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-primario">
          Bienvenido a MercaCauca
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto mt-3 leading-relaxed">
            Aqui podras encontrar y explorar los mejores productos del Cauca
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <article className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex flex-col">
          <img
            src={bannerExplorar}
            alt="Seccion Productos"
            className="w-full h-36 object-cover"
          />
          <div className="p-6 flex flex-col flex-1 gap-3">
            <h3 className="text-xl font-bold text-texto">Vitrina</h3>
            <p className="text-gray-600 text-sm flex-1">
              Consulta y ve nuestros mejores productos de origen caucano
            </p>
            <button
              type="button"
              onClick={() => navigate('/catalogo')}
              className="w-full sm:w-auto self-start bg-primario hover:bg-primario-oscuro active:scale-95 text-white font-semibold px-5 py-2.5 rounded-lg transition cursor-pointer"
            >
              Ver Vitrina
            </button>
          </div>
        </article>

        <article className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex flex-col">
          <img
            src={bannerColeccion}
            alt="Seccion Carrito"
            className="w-full h-36 object-cover"
          />
          <div className="p-6 flex flex-col flex-1 gap-3">
            <h3 className="text-xl font-bold text-texto">Mi Canasta</h3>
            <p className="text-gray-600 text-sm flex-1">
              Entra a ver los productos que hayas elegido y guardado
            </p>
            <button
              type="button"
              onClick={() => navigate('/compras')}
              className="w-full sm:w-auto self-start bg-secundario hover:bg-secundario-oscuro active:scale-95 text-white font-semibold px-5 py-2.5 rounded-lg transition cursor-pointer"
            >
              Ir a la Canasta
            </button>
          </div>
        </article>
      </div>
    </section>
  );
}

export default Inicio;
