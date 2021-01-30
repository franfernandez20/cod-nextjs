
// const api_url = "http://localhost:3000/api/";
const api_url = "https://cod-nextjs.vercel.app/api/";

export const getUserDetails = (gamerId, platform='psn') => {
  const gameIdEncode = encodeURIComponent(gamerId)
  const url = `${api_url}user/search/${gameIdEncode}?platform=${platform}`;

  return fetch(url)
    .then((response) => response.json())
    .catch((error) => {
      console.log(error);
    });
};

export const getUserStats = (gamerId, platform='psn') => {
  const gameIdEncode = encodeURIComponent(gamerId)
  const url = `${api_url}user/userstats/${gameIdEncode}?platform=${platform}`;

  return fetch(url)
    .then((response) => response.json())
    .then(( data ) => {
      return data
    })
    .catch((error) => {
      console.log(error);
    });
};
