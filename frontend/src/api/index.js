import humps from "humps";

const API = {
  securedFetch: async (route, body, opts = {}) => {
    const baseUrl = "http://localhost:5000";
    const url = `${baseUrl}/api/v1/${route}`;

    const options = { ...opts };

    if (body) {
      options.body = JSON.stringify(body);
      options.method = options.method || "POST";
      options.headers = {
        ...options.headers,
        "Content-Type": "application/json",
      };
    }

    return await fetch(url, options);
  },

  fetchJSON: async (route, body, opts = {}) => {
    try {
      body = humps.decamelizeKeys(body);
      const response = await API.securedFetch(route, body, opts);
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error);
      }
      return humps.camelizeKeys(result);
    } catch (errorResponse) {
      return new Promise((_, reject) =>
        reject(
          errorResponse.message ||
            "Something went wrong. Please try again later"
        )
      );
    }
  },
};

export default API;
