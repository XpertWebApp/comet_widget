import axios from "axios";

const post = async (url, data) => {
  try {
    const AUTH_TOKEN = localStorage.getItem("token");
    axios.defaults.headers.common["Authorization"] = AUTH_TOKEN;
    const response = await axios.post(
      `${process.env.WEB_API_URL}/${url}`,
      data
    );
    if (response) {
      return response;
    }
  } catch (err) {
    return { data: err?.response?.data };
  }
};

const getSingle = async (url, slug) => {
  try {
    const AUTH_TOKEN = localStorage.getItem("token");
    axios.defaults.headers.common["Authorization"] = AUTH_TOKEN;

    const response = await axios.get(
      `${process.env.WEB_API_URL}/${url}/${slug}`
    );
    if (response) {
      return response;
    }
  } catch (err) {
    return { data: err?.response?.data };
  }
};

const get = async (url) => {
  try {
    const AUTH_TOKEN = localStorage.getItem("token");
    axios.defaults.headers.common["Authorization"] = AUTH_TOKEN;

    const response = await axios.get(`${process.env.WEB_API_URL}/${url}`);
    if (response) {
      return response;
    }
  } catch (err) {
    return { data: err?.response?.data };
  }
};

const update = async (url, slug) => {
  try {
    const AUTH_TOKEN = localStorage.getItem("token");
    axios.defaults.headers.common["Authorization"] = AUTH_TOKEN;

    const response = await axios.put(
      `${process.env.WEB_API_URL}/${url}/${slug}`
    );
    if (response) {
      return response;
    }
  } catch (err) {
    return { data: err?.response?.data };
  }
};

const put = async (url, data) => {
  try {
    const AUTH_TOKEN = localStorage.getItem("token");
    axios.defaults.headers.common["Authorization"] = AUTH_TOKEN;

    const response = await axios.put(`${process.env.WEB_API_URL}/${url}`, data);
    if (response) {
      return response;
    }
  } catch (err) {
    return { data: err?.response?.data };
  }
};

const deleteUser = async (url) => {
  try {
    const AUTH_TOKEN = localStorage.getItem("token");
    axios.defaults.headers.common["Authorization"] = AUTH_TOKEN;

    const response = await axios.delete(
      `${process.env.WEB_API_URL}/${url}/${slug}`
    );
    if (response) {
      return response;
    }
  } catch (err) {
    return { data: err?.response?.data };
  }
};

const deletes = async (url) => {
  try {
    const AUTH_TOKEN = localStorage.getItem("token");
    axios.defaults.headers.common["Authorization"] = AUTH_TOKEN;

    const response = await axios.delete(`${process.env.WEB_API_URL}/${url}`);
    if (response) {
      return response;
    }
  } catch (err) {
    return { data: err?.response?.data };
  }
};

const streamResponseChatGPT = async (url, data) => {
  try {
    const AUTH_TOKEN = localStorage.getItem("token");
    const headers = {
      "Content-Type": "application/json",
      Authorization: AUTH_TOKEN,
    };

    const requestOptions = {
      method: "POST",
      headers: headers,
      body: JSON.stringify(data),
    };
    const response = await fetch(
      `${process.env.WEB_API_URL}/${url}`,
      requestOptions
    );
    if (response) return response;
  } catch (err) {
    return { data: err?.response?.data };
  }
};

export {
  post,
  getSingle,
  update,
  deleteUser,
  get,
  put,
  deletes,
  streamResponseChatGPT
};
