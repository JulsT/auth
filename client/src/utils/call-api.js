import axios from 'axios';

export default function callApi(url = '', token, method = 'GET', data = null) {
  const authHeaders = token
    ? {
      Authorization: `Bearer ${token}`,
    }
    : {};
  return axios({
    method,
    url,
    data: (data && JSON.stringify(data)) || null,
    headers: {
      'Content-Type': 'application/json',
      ...authHeaders,
    },
  });
}
