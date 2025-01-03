
export default async function(method, endpoint, query, body, auth) {
  const token = localStorage.getItem('token');
  if (auth && !token) {
    throw new Error('Please login to proceed');
  }

  for (const key in query) {
    if (query[key] === undefined) {
      delete query[key];
    }
  }

  const queryString = new URLSearchParams(query).toString();

  const api_url = `${endpoint}${queryString ? `?${queryString}` : ''}`;
  const response = await fetch(api_url, {
    method,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(body)
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message);
  }
  return data?.metadata;
}