const formateadorMoneda = new Intl.NumberFormat('es-CO', {
  style: 'currency',
  currency: 'USD',
});

export function formatearPrecio(valor) {
  const num = Number(valor);
  if (Number.isNaN(num)) return String(valor ?? '');
  return formateadorMoneda.format(num);
}

export function obtenerCampo(obj, ruta, defecto = '') {
  if (!obj || !ruta) return defecto;
  const valor = ruta
    .split('.')
    .reduce((acc, clave) => (acc != null ? acc[clave] : undefined), obj);
  if (Array.isArray(valor)) return valor[0] ?? defecto;
  return valor ?? defecto;
}

export function extraerLista(data, clave = '') {
  if (Array.isArray(data)) return data;
  if (clave) {
    const directa = obtenerCampo(data, clave, null);
    if (Array.isArray(directa)) return directa;
  }
  if (data && typeof data === 'object') {
    const encontrada = Object.values(data).find((v) => Array.isArray(v));
    if (encontrada) return encontrada;
  }
  return [];
}

export function normalizarItem(raw, campos, prefijo, indice = 0) {
  const rawId = obtenerCampo(raw, campos.id, indice);
  const idLimpio = String(rawId).replace(/[^a-zA-Z0-9_-]/g, '');
  let imagen = obtenerCampo(raw, campos.imagen, '');

  const extraRaw = obtenerCampo(raw, campos.extra, '');
  const precioNum = Number(extraRaw);

  return {
    id: `${prefijo}-${idLimpio || indice}`,
    titulo: String(obtenerCampo(raw, campos.titulo, 'Sin titulo')),
    subtitulo: String(obtenerCampo(raw, campos.subtitulo, 'General')),
    imagen: typeof imagen === 'string' ? imagen : '',
    extra: extraRaw !== '' ? String(extraRaw) : '',
    precio: Number.isNaN(precioNum) ? 0 : precioNum,
    raw,
  };
}
