import { useNavigate } from 'react-router-dom';

function NoEncontrado() {
  const navigate = useNavigate();

  return (
    <section className="bg-white rounded-xl p-10 border border-gray-200 shadow-sm text-center space-y-4">
      <h2 className="text-3xl font-bold text-primario">404</h2>
      <p className="text-gray-600">La ruta solicitada no existe en esta aplicacion.</p>
      <button
        type="button"
        onClick={() => navigate(-1)}
        className="bg-secundario hover:bg-secundario-oscuro text-white font-semibold px-5 py-2.5 rounded-lg transition cursor-pointer"
      >
        Volver atras
      </button>
    </section>
  );
}

export default NoEncontrado;
