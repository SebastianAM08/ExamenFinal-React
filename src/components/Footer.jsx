function Footer() {
  const anio = new Date().getFullYear();

  return (
    <footer className="bg-texto text-gray-300 text-center py-6 px-4 text-sm mt-auto">
      <p className="font-medium text-white">
        {anio} Evidencia Final - SENA Comercio y Servicios - Hecho por Juan Sebastian Acevedo Medina ADSO 3223898
      </p>
      <p className="text-xs text-gray-400 mt-1">
        Fuente de datos: https://dummyjson.com
      </p>
    </footer>
  );
}

export default Footer;
