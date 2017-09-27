import { assign } from 'lodash';

require('whatwg-fetch');

const acceptJson = { Accept: 'application/json; charset=UTF-8' };
const sendsJson = { 'Content-Type': 'application/json; charset=UTF-8' };

const apiFetch = (endpoint, config = {}) => {
  const reqConfig = assign({}, config);

  reqConfig.headers = assign(reqConfig.headers || {}, acceptJson);

  if (reqConfig.body) {
    reqConfig.body = JSON.stringify(reqConfig.body);
    assign(reqConfig.headers, sendsJson);
  }

  if (reqConfig.multipart) {
    reqConfig.body = reqConfig.multipart;
  }

  return fetch(endpoint, reqConfig)
    .then(checkStatus)
    .then(toJSON);
};

const checkStatus = res => (res.ok ? res : Promise.reject(res));

const toJSON = res =>
  res.status !== 202 && res.status !== 204 && res.json ? res.json() : res;

const useMethod = methodName => (endpoint, config) =>
  apiFetch(endpoint, assign({ method: methodName }, config));

const GET = apiFetch;
const DELETE = useMethod('DELETE');
const POST = useMethod('POST');
const PUT = useMethod('PUT');
const PATCH = useMethod('PATCH');

export { GET, DELETE, POST, PUT, PATCH };

export default apiFetch;
