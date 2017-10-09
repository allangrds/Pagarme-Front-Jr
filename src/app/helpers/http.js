const apiFetch = (endpoint, config = {}) => {
  return fetch(endpoint, config)
    .then(checkStatus)
    .then(toJSON);
};

const checkStatus = res => (res.ok ? res : Promise.reject(res));

const toJSON = res => (res.status === 200 && res.json ? res.json() : res);

const useMethod = methodName => (endpoint, config) =>
  apiFetch(endpoint, Object.assign({ method: methodName }, config));

const GET = useMethod('GET');

export { GET };
