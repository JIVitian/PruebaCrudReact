// Este helper tiene la estructura de closure
export const helpHttp = () => {
  const customFetch = (endpoint, options) => {
    const defaultHeader = {
      accept: "application/json",
    };

    // Para manejar la falta de respuesta del servidor
    const controller = new AbortController();
    options.signal = controller.signal;

    options.method = options.method || "GET";
    options.headers = options.headers
      ? { ...defaultHeader, ...options.headers }
      : defaultHeader;

    options.body = JSON.stringify(options.body) || false;

    // Si hago una petición get, no necesito enviar un body
    // Así que lo elimino para evitar errores.
    if (!options.body) delete options.body;

    // Si no recibo respuesta del servidor en 3 segundos, la peticion se aborta
    // Luego de esto, se habilita el catch del controller
    setTimeout(() => controller.abort, 3000);

    return fetch(endpoint, options)
      .then((res) =>
        res.ok
          ? res.json()
          : Promise.reject({
              err: true,
              status: res.status || "00",
              satusText: res.satusText || "Ocurrió un error",
            })
      )
      .catch((err) => err);
  };

  const get = (url, options = {}) => customFetch(url, options);

  const post = (url, options = {}) => {
    options.method = "POST";
    return customFetch(url, options);
  };

  const put = (url, options = {}) => {
    options.method = "PUT";
    return customFetch(url, options);
  };

  const del = (url, options = {}) => {
    options.method = "DELETE";
    return customFetch(url, options);
  };

  return { get, post, put, del };
};
