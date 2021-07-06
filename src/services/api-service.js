/* eslint-disable no-alert */
const apiOrigin = 'http://localhost:3001';
if (!apiOrigin) alert('La conexión con el servidor no ha podido ser establecida');

/**
 * Realiza un HTTP GET a la API del sistema
 * @param {string} path La ruta al recurso que se quiere obtener
 * @param {Object} body El cuerpo de la request
 * @param {Object} params Los queryparams
 * @returns El recurso entregado por la API
 */

async function apiGet(path, params) {
  const TOKEN_KEY = 'token';
  const token = localStorage.getItem(TOKEN_KEY);
  const url = new URL(`${apiOrigin}/${path}`);
  if (params) {
    Object.keys(params)
      .forEach((key) => url.searchParams.append(key, params[key]));
  }
  const results = await fetch(
    url,
    {
      method: 'GET',
      mode: 'cors',
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
    },
  )
    .then((r) => r.json())
    .catch(() => {
      alert('Error de conexión inesperado. Por favor, inténtelo más tarde');
      return null;
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
  const TOKEN_KEY = 'token';
  const token = localStorage.getItem(TOKEN_KEY);
  const url = new URL(`${apiOrigin}/${path}`);
  let requestBody = {};
  if (params) {
    Object.keys(params)
      .forEach((key) => url.searchParams.append(key, params[key]));
  }
  if (body) requestBody = body;
  const results = await fetch(
    url,
    {
      method: 'POST',
      mode: 'cors',
      body: requestBody,
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
    },
  )
    .then((r) => r.json())
    .catch((e) => {
      alert(e);
      return null;
    });
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
  const TOKEN_KEY = 'token';
  const token = localStorage.getItem(TOKEN_KEY);
  const url = new URL(`${apiOrigin}/${path}`);
  let requestBody = {};
  if (params) {
    Object.keys(params)
      .forEach((key) => url.searchParams.append(key, params[key]));
  }
  if (body) requestBody = body;
  const results = await fetch(
    url,
    {
      method: 'PATCH',
      mode: 'cors',
      body: requestBody,
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
    },
  )
    .then((r) => r.json())
    .catch(() => {
      alert('Error de conexión inesperado. Por favor, inténtelo más tarde');
      return null;
    });
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
  const TOKEN_KEY = 'token';
  const token = localStorage.getItem(TOKEN_KEY);
  const url = new URL(`${apiOrigin}/${path}`);
  let requestBody = {};
  if (params) {
    Object.keys(params)
      .forEach((key) => url.searchParams.append(key, params[key]));
  }
  if (body) requestBody = body;
  const results = await fetch(
    url,
    {
      method: 'DELETE',
      mode: 'cors',
      body: requestBody,
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
    },
  )
    .then((r) => r.json())
    .catch(() => {
      alert('Error de conexión inesperado. Por favor, inténtelo más tarde');
      return null;
    });
  return results;
}

/**
 * Realiza un HTTP POST a la API del sistema
 * @param {string} path La ruta para crear un recurso
 * @param {Object} body El cuerpo de la request
 * @returns La respuesta entregada por la API
 */
async function apiPostMassiveUpload(path, body) {
  const TOKEN_KEY = 'token';
  const token = localStorage.getItem(TOKEN_KEY);
  const url = new URL(`${apiOrigin}/${path}`);
  const results = await fetch(
    url,
    {
      method: 'POST',
      mode: 'cors',
      body,
      headers: {
        Authorization: token,
      },
    },
  )
    .then((r) => r.json())
    .catch((e) => {
      alert(e);
      return null;
    });
  return results;
}

export {
  apiGet,
  apiPost,
  apiPatch,
  apiDelete,
  apiPostMassiveUpload,
};
