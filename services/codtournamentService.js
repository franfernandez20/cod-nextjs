
const api_url = "http://localhost:3000/api/";

export const getUserDetails = (gamerId) => {
  const gameIdEncode = encodeURIComponent(gamerId)
  const url = `${api_url}user/search/${gameIdEncode}`;

  return fetch(url)
    .then((response) => response.json())
    .then(({ data }) => {
      return data
    })
    .catch((error) => {
      console.log(error);
    });
};

export const getUserStats = (gamerId) => {
  const gameIdEncode = encodeURIComponent(gamerId)
  const url = `${api_url}user/userstats/${gameIdEncode}`;

  return fetch(url)
    .then((response) => response.json())
    .then(( data ) => {
      return data
    })
    .catch((error) => {
      console.log(error);
    });
};
