const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000';

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
    ...options,
  });

  if (!response.ok) {
    let message = 'Request failed.';
    try {
      const payload = await response.json();
      message = payload.message || message;
    } catch {
      message = response.statusText || message;
    }
    throw new Error(message);
  }

  if (response.status === 204) {
    return null;
  }

  return response.json();
}

export const workflowApi = {
  list: () => request('/workflows'),
  get: (id) => request(`/workflows/${id}`),
  create: (payload) =>
    request('/workflows', { method: 'POST', body: JSON.stringify(payload) }),
  update: (id, payload) =>
    request(`/workflows/${id}`, { method: 'PUT', body: JSON.stringify(payload) }),
  remove: (id) => request(`/workflows/${id}`, { method: 'DELETE' }),
};

export const executionApi = {
  run: (payload) =>
    request('/execution/run', { method: 'POST', body: JSON.stringify(payload) }),
  get: (id) => request(`/execution/${id}`),
};
