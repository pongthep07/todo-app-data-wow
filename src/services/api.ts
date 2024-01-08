import axios from "axios";
export const baseURL = 'http://localhost:3001'


const client = axios.create({
    baseURL: baseURL,
    headers: {
        Accept: 'application/json',
    }
});


client.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  const get = async (endpoint: string, parmas: object = {}) => {
    return await client.get(`${endpoint}`, parmas);
  }
  const post = async (endpoint: string, parmas: object = {}) => {
    return await client.post(`${endpoint}`, parmas);
  }
  const put = async (endpoint: string, parmas: object = {}) => {
    return await client.put(`${endpoint}`, parmas);
  }
  const patch = async (endpoint: string, parmas: object = {}) => {
    return await client.patch(`${endpoint}`, parmas);
  }

  const del = async (endpoint: string, parmas: object = {}) => {
    return await client.delete(`${endpoint}`, parmas);
  }

  const api = {
    get,
    post,
    put,
    patch,
    del,
  };

  export default api