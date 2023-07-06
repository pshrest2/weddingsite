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
    const response = await API.securedFetch(route, body, opts);

    if (response.ok) {
      if (response.headers.get("content-type").match(/application\/json/i)) {
        const result = await response.json();
        return humps.camelizeKeys(result);
      }
      throw new Error(response);
    }

    if (response.status >= 400) {
      try {
        const errorResponse = await response.json();
        throw new Error(errorResponse);
      } catch {
        throw new Error({
          error: {
            type: "FetchParseError",
            message:
              "A 422 error was thrown, but the response could not be parsed as JSON",
          },
        });
      }
    }

    throw new Error(response);
  },
};

export default API;
