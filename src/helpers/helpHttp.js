// Este helper tiene la estructura de closure
export const helpHttp = () => {
  const customFetch = (endpoint, options) => {
    const defaultHeader = {
      accept: "application/json",
    };

    // Para manejar la falta de respuesta del servidor
    const controller = new AbortController();
    options.signal = controller.signal;

    options.method ??= "GET";
    options.headers = options.headers
      ? { ...defaultHeader, ...options.headers }
      : defaultHeader;

    options.body = JSON.stringify(options.body) || false;

    // Si hago una petición get, no necesito enviar un body
    // Así que lo elimino para evitar errores.
    if (!options.body) delete options.body;
  };

  const get = () => {};

  const post = () => {};

  const put = () => {};

  const del = () => {};

  return { get, post, put, del };
};
