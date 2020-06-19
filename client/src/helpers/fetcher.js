const host = "http://localhost:4000/api/v1";

const fetcher = async (path, method = "GET", data = {}, token = true) => {
  try {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");

    if (token) {
      const token = window.localStorage.getItem("__jw__");

      if (!token) {
        throw new Error("Token not valid");
      }

      headers.append("Authorization", token);
    }

    let options = {
      method,
      headers,
      body: JSON.stringify(data),
    };

    if (method === "GET" || method === "DELETE") {
      options = {
        method,
        headers,
      };
    }

    const preData = await fetch(`${host}${path}`, options);
    const response = await preData.json();
    //console.log("Good response", response);

    return response;
  } catch (error) {
    console.error(error);
  }
};

export default fetcher;
