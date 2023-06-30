const api_url = "http://localhost:3000/api/";
// const api_url = "https://cod-nextjs.vercel.app/api/";

export const getUserDetails = (gamerId, platform = "psn") => {
  const gameIdEncode = encodeURIComponent(gamerId);
  const url = `${api_url}user/search/${gameIdEncode}?platform=${platform}`;

  return fetch(url)
    .then((response) => response.json())
    .catch((error) => {
      console.log(error);
    });
};

export const getUserStats = (gamerId, platform = "psn") => {
  const gameIdEncode = encodeURIComponent(gamerId);
  const url = `${api_url}user/userstats/${gameIdEncode}?platform=${platform}`;

  return fetch(url)
    .then((response) => response.json())
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.log(error);
    });
};

export const getUserMatchNames = (gamerId, platform = "psn") => {
  const gameIdEncode = encodeURIComponent(gamerId);
  const url = `${api_url}user/userMatchNames/${gameIdEncode}?platform=${platform}`;

  return fetch(url)
    .then((response) => response.json())
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.log(error);
    });
};

export const getFullMatch = (matchID) => {
  const url = `${api_url}match/fullmatch/${matchID}`;

  return fetch(url)
    .then((response) => response.json())
    .then(({ status, data }) => {
      if (status !== "success") throw "ERROR getting match/fullmatch ";
      return data;
    })
    .catch((error) => {
      console.log(error);
    });
};

export const getUserFullMatchs = async (
  gamerId,
  platform = "psn",
  size = 5
) => {
  const gameIdEncode = encodeURIComponent(gamerId);
  const url = `${api_url}user/matchs/${gameIdEncode}?platform=${platform}`;

  const matchs = await fetch(url)
    .then((response) => response.json())
    .then(({ status, data }) => {
      if (status != "success") throw "ERROR getting user/matchs";
      return data;
    })
    .catch((error) => {
      console.log(error);
    });
  matchs.splice(size);
  const promises = matchs.map(({ matchID }) => {
    return getFullMatch(matchID);
  });
  return Promise.all(promises);
};

export const getLastMatches = (gamerId, platform = "psn", size = 5) => {
  const gameIdEncode = encodeURIComponent(gamerId);
  const url = `${api_url}user/matchs/${gameIdEncode}?platform=${platform}`;
  return fetch(url)
    .then((response) => response.json())
    .then(({ status, data }) => {
      if (status != "success") throw "ERROR getting user/matchs";
      return data.slice(0, size); // TODO Buscar como se limita en peticion
    })
    .catch((error) => {
      console.log(error);
    });
};

export const getMatchStats = async (matchID) => {
  const fullMatch = await getFullMatch(matchID);
  const promises = fullMatch.allPlayers
    .map(({ player }) => getPlayerKD(player).then)

};

// export const getProcesedFullMatchs = (gameID, platform = "psn", size = 5) => {
//   return getUserFullMatchs(gameID, platform, size).then((result) => {
//     result.map(({ allPlayers }) => {
//       allPlayers.forEach((player) => {
//         console.log({ aaa: player.username });
//       });
//     });
//   });
// };

export const getTourStats = (tourid) => {
  const gameIdEncode = encodeURIComponent(gamerId);
  const url = `${api_url}user/userstats/${gameIdEncode}?platform=${platform}`;

  return fetch(url)
    .then((response) => response.json())
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.log(error);
    });
};

/**
 * Setear el nuevo wallet. Junto con el respaldo para confirmar
 * @param {String} userid
 * @param {String} tourid
 */
export const setUserPay = (userid, tourid) => {
  const url = `${api_url}user/pay/${userid}?tourid=${tourid}`;

  const myHeaders = new Headers();

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  return fetch(url, requestOptions);
};
