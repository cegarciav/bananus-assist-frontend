const apiOrigin = 'http://localhost:3001';
if (!apiOrigin) throw 'API ORIGIN variable is missing';

/**
 * Realiza un HTTP GET a la API del sistema
 * @param {string} path La ruta al recurso que se quiere obtener
 * @param {Object} body El cuerpo de la request
 * @param {Object} params Los queryparams
 * @returns El recurso entregado por la API
 */

async function apiGet(path, body, params) {
  const url = new URL(`${apiOrigin}/${path}`);
  if (params) {
    Object.keys(params)
      .forEach((key) => url.searchParams.append(key, params[key]));
  }
  if (!body) body = {};
  const results = await fetch(
    url,
    {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
    },
  )
    .then((r) => r.json())
    .catch((e) => e)
    .then((data) => {
      const request = data;
      return request;
    });
  return results;
}

/**
 * Realiza un HTTP POST a la API del sistema
 * @param {string} path La ruta para crear un recurso
 * @param {Object} body El cuerpo de la request
 * @param {Object} params Los queryparams
 * @returns La respuesta entregada por la API
 */
async function apiPost(path, body, params) {
  const url = new URL(`${apiOrigin}/${path}`);
  if (params) {
    Object.keys(params)
      .forEach((key) => url.searchParams.append(key, params[key]));
  }
  if (!body) body = {};
  const results = await fetch(
    url,
    {
      method: 'POST',
      mode: 'cors',
      body,
      headers: {
        'Content-Type': 'application/json',
      },
    },
  )
    .then((r) => r.json())
    .catch((e) => e);
  return results;
}

/**
 * Realiza un HTTP PATCH a la API del sistema
 * @param {string} path La ruta al recurso que se quiere modificar
 * @param {Object} body El cuerpo de la request
 * @param {Object} params Los queryparams
 * @returns La respuesta entregada por la API
 */
async function apiPatch(path, body, params) {
  const url = new URL(`${apiOrigin}/${path}`);
  if (params) {
    Object.keys(params)
      .forEach((key) => url.searchParams.append(key, params[key]));
  }
  if (!body) body = {};
  const results = await fetch(
    url,
    {
      method: 'PATCH',
      mode: 'cors',
      body,
      headers: {
        'Content-Type': 'application/json',
      },
    },
  )
    .then((r) => r.json())
    .catch((e) => e);
  return results;
}

/**
 * Realiza un HTTP DELETE a la API del sistema
 * @param {string} path La ruta al recurso que se quiere eliminar
 * @param {Object} body El cuerpo de la request
 * @param {Object} params Los queryparams
 * @returns La respuesta entregada por la API
 */
async function apiDelete(path, body, params) {
  const url = new URL(`${apiOrigin}/${path}`);
  if (params) {
    Object.keys(params)
      .forEach((key) => url.searchParams.append(key, params[key]));
  }
  if (!body) body = {};
  const results = await fetch(
    url,
    {
      method: 'DELETE',
      mode: 'cors',
      body,
      headers: {
        'Content-Type': 'application/json',
      },
    },
  )
    .then((r) => r.json())
    .catch((e) => e);
  return results;
}

export {
  apiGet,
  apiPost,
  apiPatch,
  apiDelete,
};
