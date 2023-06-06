enum APICallType {
  GET = 'GET',
  // We can add POST, PUT, PATCH, DELETE types when we need them.
}

export default function APIUtils() {
  const baseURL = 'https://swapi.dev/api';

  const headers = {
    'Content-Type': 'application/json',
  };

  function getData(apiURL: string) {
    const request = {
      method: APICallType.GET,
      headers,
    };
    return fetch(baseURL + apiURL, request).then((response) => {
      if (response.ok) return response.json();
      return response;
    });
  }

  return {
    getData,
  };
}
