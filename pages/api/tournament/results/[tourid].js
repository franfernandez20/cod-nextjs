import { XSRF_TOKEN } from "../../../../lib/api";

import {
  getTournament,
  setTourStats,
  getDBUser,
  getTourTeams,
} from "../../../../firebase/client";

/*
1 punto por eliminación; con 20 puntos por una victoria, 15 por los 5 primeros, 10 por los 15 primero y 5 por los 25 primeros.

1      | 20
2-5    | 15
6-15   | 10
16-25  | 5

1 x kill


*/

const getPoints = (kills, position) => {
  let points = 0;
  switch (true) {
    case position === 1:
      points = 20;
      break;
    case position > 1 && position <= 5:
      points = 15;
      break;
    case position > 5 && position <= 15:
      points = 10;
      break;
    case position > 15 && position <= 25:
      points = 5;
      break;
    default:
      break;
  }
  return points + kills;
};

const getUserMatches_OLD = (userid, platform, ini, fin) => {
  if (!platform) throw "platform es necesario";

  var myHeaders = new Headers();
  myHeaders.append(
    "Cookie",
    `ACT_SSO_COOKIE=MTUyNTA1NjA1NzMwNTE3MjgxMDE6MTYxMjgxMDA2MDYwNToxNjRlOTJiNGUwNTgxZTAzYTlkYzY2NmEwYTc2ZDJjMA; ACT_SSO_COOKIE_EXPIRY=1612810060605; ACT_SSO_EVENT=\"LOGIN_SUCCESS:1611600460693\"; ACT_SSO_REMEMBER_ME=MTUyNTA1NjA1NzMwNTE3MjgxMDE6JDJhJDEwJG94bjgvT092VWQ0TmxrOElROEtONHVZMngyYmJiWklHc0k4VEJXcktGYkZ3UUVlb3laLlUu; CRM_BLOB=eyJ2ZXIiOjEsInBsYXQiOnsicCI6eyJ2IjowLCJ0Ijp7ImJvNCI6eyJtcCI6bnVsbCwieiI6bnVsbCwicHJlcyI6MC4wLCJzcCI6MC4wLCJsZXYiOjAuMH19fX19; XSRF-TOKEN=${XSRF_TOKEN}; _abck=6BA1D87F3C1EE32059ABAA794335CDFF~-1~YAAQhBkVAtE80xZ3AQAAi2jeOgUiTynFuJnpQ6Slo7KuNA5dokGo5cdRW0Un4j7i7V+XJfM6XyBz+dJfg98UQJ/GsY/cm1JohEl1wdJgan+uoT2m+ivtOVAUTukx4dIUdsbZ88/ogS3Prjd1QsLN5rz5NRvLRvkNuveDQWkgEZQHE1RoDTSS/qJXBS4DDWWGjmH7e73HiA/N6aYH8aktzo3oDe7cOGtCE5UdeHsa207Su/A+iFZYH12wMite2PQX3jfNH2KBUyYIOe0dRDIEh9NTvcps/qoh0A==~-1~-1~-1; ak_bmsc=F1C22E0152B4EBE210EA13B9385EDB77021519842B080000CF110F60D1A4B847~plu1gkgIuKzT9rKCjsMWb2uoL/MBe4kOmFZ9btzGMloLWpjtJneFucDY0GYjH0k4lQbMd9SMwHVnVAEkv8S8IxJGuVq0za4sJb1KyrsY+w/DR4jFNygvXiP61e1+VhCM+Xl47JB5djZMhTfwNbfMZFGOuc98w3PFkkoetjROF/Dh2T/hwZbLjmLQrTivCo6Df9+ZQQ24VEeIBvz67Ku5jpy/117dzK6wibI84a3DtTtH4=; atkn=eyJhbGciOiAiQTEyOEtXIiwgImVuYyI6ICJBMTI4R0NNIiwgImtpZCI6ICJ1bm9fcHJvZF9sYXNfMSJ9.C6aFd4-X6H6SdmUyrkiOExYdEuSJtk13X0sZI9EpKMENGiqCJY6w0w.-d1ZIV6MSQD0J72h.0_iT9JEloDBGmZuS8x5ngDgdN78I-P_iBi6HjpoVXl11WaxQeqXrba5oFAUiUujRZM9_sn13kOfzWzMFNjXj21T3aImCt547rU0XtVYBCROv9M9Xx7CJiLEJwPHoV6c15QW-KhtIH1zXvenF3muuc4rGxDKkmOO643fEPF5LeH5p_kUPDwGHkdv_cvPjD7BcdNq6YfXcmR3bD4hSFPt5-UbLA9qrUiRPDVXEszN5hVA9TqLqiW7WkgzSLPfOxjQgI9w1PkEiY-ceBcUb7elr5DaaqXa7csnLwquMJ0G7Oeuc2a4HaXFSO027X8sv05pBv6lBra-zx6SG_QjI_xSpw6fMVPkj8bUQDIiHZQSHtFcl7hdv9yb--U5MTSOY0qqkCXvUgC6jijzjfPZcL0jKR6Y2Bks7PnNXSAychiIo1sCsxyYE53GHIr8l4LvhdCl85AMUlzP3fjfDZlnjGmPZHB50OvOy2g.lVqxU4ydnwfk8x-v9cp5Sg; bm_mi=AA82B4BFCCFD9CEFE8C1FE329559D9E1~KmUhXYWf/vJh1M0jM/WHyXbVEEtn07KzlECt6VPo4or2vBIQeJmM5Ne/S8DdtmJSHQLJly+pd/oICw9oXn6DS1wwt5h4p5MRLaRtrU8GRfR5HY9IezPfef0qZ6bKmgMZ+e/+vgRTL88+PPg3o96NGG838nZ2WvpdrbNHPVMpjF/7RycFFnzXAagsCEw9C97wp5Clb5aAAtwzO2/2FK1T42O9/s+fOjxGmKdzpN9aOZ5jh3tJAlJFSGtEPOQCdpvP; bm_sv=B7450F1009CE378CC9912CB5CFFF99E0~gFxM5Hln49k0+41bX04RgEntzhhTk4WrSkDA1zaRrhJCHSCYHO4umkoVmejUIpeLrI3foDY/OR+EuEZRjYkNQQjXPGOFprElw5UCWYXIIBDJX6OI0Pp5AmK8wLp/+VZpHTwuhV9R4/fv+NGVjSsPbUecHmJHZvFyIiVTOvZC4lU=; bm_sz=078AB8C3422DD30C43CF385CCB0730B8~YAAQhBkVAtE70xZ3AQAAY7TcOgoDLAgcKZki5v2mOHaP7aXm9w9kCSk/UAITIC8lUc8p0tnIqKrU81NkzoZCJqXF+bSUZ6yqBrPEKulQb9p8cfqbQYo/T3OdXuw/+X2P16z9CYdT/F+lcbNIzC8hrrrsshLflaLMdTGIZaSNIPAm6AR7hHVYq26daP3LN5iUkVHCMA==; comid=cod; new_SiteId=cod; pgacct=psn; tfa_enrollment_seen=true; API_CSRF_TOKEN=c10b8803-2cca-44f3-ac3b-31bf2800ccbb`
  );

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  const inisec = ini / 1000;
  const finsec = fin / 1000;
  const encodeduser = encodeURIComponent(userid);
  return fetch(
    `https://my.callofduty.com/api/papi-client/crm/cod/v2/title/mw/platform/${platform}/gamer/${encodeduser}/matches/wz/start/0/end/0/details`,
    requestOptions
  )
    .then((response) => response.json())
    .then((result) => {
      const { status, data } = result;
      if (status === "success") {
        const parsedMatches = data.matches.reduce((res, match) => {
          if (
            match.utcStartSeconds > inisec &&
            match.utcStartSeconds < finsec
          ) {
            const {
              utcStartSeconds,
              utcEndSeconds,
              map,
              mode,
              matchID,
              privateMatch,
            } = match;
            const {
              kills,
              deaths,
              kdRatio,
              gulagDeaths,
              gulagKills,
              teamPlacement,
              damageDone,
              damageTaken,
            } = match.playerStats;
            const { team, username, uno } = match.player;
            res = [
              ...res,
              {
                utcStartSeconds,
                utcEndSeconds,
                points: getPoints(kills, teamPlacement),
                map,
                mode,
                matchID,
                privateMatch,
                kills,
                deaths,
                kdRatio,
                gulagDeaths,
                gulagKills,
                teamPlacement,
                damageDone,
                damageTaken,
                team,
                username,
                uno,
              },
            ];
          }
          return res;
        }, []);
        return parsedMatches;
      }
      throw "State: Error | La peticion a cod devolvio error";
    });
};

const getMatchTeamStats = (matchID, team, resolve) => {
  const myHeaders = new Headers();
  myHeaders.append(
    "Cookie",
    `ACT_SSO_COOKIE=MTUyNTA1NjA1NzMwNTE3MjgxMDE6MTYxMjgxMDA2MDYwNToxNjRlOTJiNGUwNTgxZTAzYTlkYzY2NmEwYTc2ZDJjMA; ACT_SSO_COOKIE_EXPIRY=1612810060605; ACT_SSO_EVENT=\"LOGIN_SUCCESS:1611600460693\"; ACT_SSO_REMEMBER_ME=MTUyNTA1NjA1NzMwNTE3MjgxMDE6JDJhJDEwJG94bjgvT092VWQ0TmxrOElROEtONHVZMngyYmJiWklHc0k4VEJXcktGYkZ3UUVlb3laLlUu; CRM_BLOB=eyJ2ZXIiOjEsInBsYXQiOnsicCI6eyJ2IjowLCJ0Ijp7ImJvNCI6eyJtcCI6bnVsbCwieiI6bnVsbCwicHJlcyI6MC4wLCJzcCI6MC4wLCJsZXYiOjAuMH19fX19; XSRF-TOKEN=${XSRF_TOKEN}; _abck=6BA1D87F3C1EE32059ABAA794335CDFF~-1~YAAQhBkVAtE80xZ3AQAAi2jeOgUiTynFuJnpQ6Slo7KuNA5dokGo5cdRW0Un4j7i7V+XJfM6XyBz+dJfg98UQJ/GsY/cm1JohEl1wdJgan+uoT2m+ivtOVAUTukx4dIUdsbZ88/ogS3Prjd1QsLN5rz5NRvLRvkNuveDQWkgEZQHE1RoDTSS/qJXBS4DDWWGjmH7e73HiA/N6aYH8aktzo3oDe7cOGtCE5UdeHsa207Su/A+iFZYH12wMite2PQX3jfNH2KBUyYIOe0dRDIEh9NTvcps/qoh0A==~-1~-1~-1; ak_bmsc=F1C22E0152B4EBE210EA13B9385EDB77021519842B080000CF110F60D1A4B847~plu1gkgIuKzT9rKCjsMWb2uoL/MBe4kOmFZ9btzGMloLWpjtJneFucDY0GYjH0k4lQbMd9SMwHVnVAEkv8S8IxJGuVq0za4sJb1KyrsY+w/DR4jFNygvXiP61e1+VhCM+Xl47JB5djZMhTfwNbfMZFGOuc98w3PFkkoetjROF/Dh2T/hwZbLjmLQrTivCo6Df9+ZQQ24VEeIBvz67Ku5jpy/117dzK6wibI84a3DtTtH4=; atkn=eyJhbGciOiAiQTEyOEtXIiwgImVuYyI6ICJBMTI4R0NNIiwgImtpZCI6ICJ1bm9fcHJvZF9sYXNfMSJ9.C6aFd4-X6H6SdmUyrkiOExYdEuSJtk13X0sZI9EpKMENGiqCJY6w0w.-d1ZIV6MSQD0J72h.0_iT9JEloDBGmZuS8x5ngDgdN78I-P_iBi6HjpoVXl11WaxQeqXrba5oFAUiUujRZM9_sn13kOfzWzMFNjXj21T3aImCt547rU0XtVYBCROv9M9Xx7CJiLEJwPHoV6c15QW-KhtIH1zXvenF3muuc4rGxDKkmOO643fEPF5LeH5p_kUPDwGHkdv_cvPjD7BcdNq6YfXcmR3bD4hSFPt5-UbLA9qrUiRPDVXEszN5hVA9TqLqiW7WkgzSLPfOxjQgI9w1PkEiY-ceBcUb7elr5DaaqXa7csnLwquMJ0G7Oeuc2a4HaXFSO027X8sv05pBv6lBra-zx6SG_QjI_xSpw6fMVPkj8bUQDIiHZQSHtFcl7hdv9yb--U5MTSOY0qqkCXvUgC6jijzjfPZcL0jKR6Y2Bks7PnNXSAychiIo1sCsxyYE53GHIr8l4LvhdCl85AMUlzP3fjfDZlnjGmPZHB50OvOy2g.lVqxU4ydnwfk8x-v9cp5Sg; bm_mi=AA82B4BFCCFD9CEFE8C1FE329559D9E1~KmUhXYWf/vJh1M0jM/WHyXbVEEtn07KzlECt6VPo4or2vBIQeJmM5Ne/S8DdtmJSHQLJly+pd/oICw9oXn6DS1wwt5h4p5MRLaRtrU8GRfR5HY9IezPfef0qZ6bKmgMZ+e/+vgRTL88+PPg3o96NGG838nZ2WvpdrbNHPVMpjF/7RycFFnzXAagsCEw9C97wp5Clb5aAAtwzO2/2FK1T42O9/s+fOjxGmKdzpN9aOZ5jh3tJAlJFSGtEPOQCdpvP; bm_sv=B7450F1009CE378CC9912CB5CFFF99E0~gFxM5Hln49k0+41bX04RgEntzhhTk4WrSkDA1zaRrhJCHSCYHO4umkoVmejUIpeLrI3foDY/OR+EuEZRjYkNQQjXPGOFprElw5UCWYXIIBDJX6OI0Pp5AmK8wLp/+VZpHTwuhV9R4/fv+NGVjSsPbUecHmJHZvFyIiVTOvZC4lU=; bm_sz=078AB8C3422DD30C43CF385CCB0730B8~YAAQhBkVAtE70xZ3AQAAY7TcOgoDLAgcKZki5v2mOHaP7aXm9w9kCSk/UAITIC8lUc8p0tnIqKrU81NkzoZCJqXF+bSUZ6yqBrPEKulQb9p8cfqbQYo/T3OdXuw/+X2P16z9CYdT/F+lcbNIzC8hrrrsshLflaLMdTGIZaSNIPAm6AR7hHVYq26daP3LN5iUkVHCMA==; comid=cod; new_SiteId=cod; pgacct=psn; tfa_enrollment_seen=true; API_CSRF_TOKEN=c10b8803-2cca-44f3-ac3b-31bf2800ccbb`
  );

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  fetch(
    `https://my.callofduty.com/api/papi-client/crm/cod/v2/title/mw/platform/psn/fullMatch/wz/${matchID}/es`,
    requestOptions
  )
    .then((response) => response.json())
    .then((result) => {
      // console.log("--->", result);
      const { status, data } = result;
      if (status === "success") {
        const teamMatch = data.allPlayers.reduce((acc, elem) => {
          const { player, playerStats } = elem;
          if (player.team === team) {
            // Tocar por aqui para sacar más stats de la partida
            acc = [
              ...acc,
              {
                username: player.username,
                kills: playerStats.kills,
                teamPlacement: playerStats.teamPlacement,
                deaths: playerStats.deaths,
              },
            ];
          }
          return acc;
        }, []);
        const kills = teamMatch.reduce((acc, user) => (acc += user.kills), 0);
        const teamPlacement = teamMatch[0].teamPlacement;
        const points = getPoints(kills, teamPlacement);
        const teamMatchStats = {
          kills,
          teamPlacement, // Comprobar todos misma pos
          points,
          teamMatch,
        };
        resolve(teamMatchStats);
      } else console.log("Error getting fullMatch bad response");
    })
    .catch((error) => console.log("Error getting fullMatch", error));
};

const getUserMatches = (userid, platform, ini, fin) => {
  console.log("platform", platform);
  console.log("userid", userid);
  if (!platform) throw "platform es necesario";

  const myHeaders = new Headers();
  myHeaders.append(
    "Cookie",
    `ACT_SSO_COOKIE=MTUyNTA1NjA1NzMwNTE3MjgxMDE6MTYxMjgxMDA2MDYwNToxNjRlOTJiNGUwNTgxZTAzYTlkYzY2NmEwYTc2ZDJjMA; ACT_SSO_COOKIE_EXPIRY=1612810060605; ACT_SSO_EVENT=\"LOGIN_SUCCESS:1611600460693\"; ACT_SSO_REMEMBER_ME=MTUyNTA1NjA1NzMwNTE3MjgxMDE6JDJhJDEwJG94bjgvT092VWQ0TmxrOElROEtONHVZMngyYmJiWklHc0k4VEJXcktGYkZ3UUVlb3laLlUu; CRM_BLOB=eyJ2ZXIiOjEsInBsYXQiOnsicCI6eyJ2IjowLCJ0Ijp7ImJvNCI6eyJtcCI6bnVsbCwieiI6bnVsbCwicHJlcyI6MC4wLCJzcCI6MC4wLCJsZXYiOjAuMH19fX19; XSRF-TOKEN=${XSRF_TOKEN}; _abck=6BA1D87F3C1EE32059ABAA794335CDFF~-1~YAAQhBkVAtE80xZ3AQAAi2jeOgUiTynFuJnpQ6Slo7KuNA5dokGo5cdRW0Un4j7i7V+XJfM6XyBz+dJfg98UQJ/GsY/cm1JohEl1wdJgan+uoT2m+ivtOVAUTukx4dIUdsbZ88/ogS3Prjd1QsLN5rz5NRvLRvkNuveDQWkgEZQHE1RoDTSS/qJXBS4DDWWGjmH7e73HiA/N6aYH8aktzo3oDe7cOGtCE5UdeHsa207Su/A+iFZYH12wMite2PQX3jfNH2KBUyYIOe0dRDIEh9NTvcps/qoh0A==~-1~-1~-1; ak_bmsc=F1C22E0152B4EBE210EA13B9385EDB77021519842B080000CF110F60D1A4B847~plu1gkgIuKzT9rKCjsMWb2uoL/MBe4kOmFZ9btzGMloLWpjtJneFucDY0GYjH0k4lQbMd9SMwHVnVAEkv8S8IxJGuVq0za4sJb1KyrsY+w/DR4jFNygvXiP61e1+VhCM+Xl47JB5djZMhTfwNbfMZFGOuc98w3PFkkoetjROF/Dh2T/hwZbLjmLQrTivCo6Df9+ZQQ24VEeIBvz67Ku5jpy/117dzK6wibI84a3DtTtH4=; atkn=eyJhbGciOiAiQTEyOEtXIiwgImVuYyI6ICJBMTI4R0NNIiwgImtpZCI6ICJ1bm9fcHJvZF9sYXNfMSJ9.C6aFd4-X6H6SdmUyrkiOExYdEuSJtk13X0sZI9EpKMENGiqCJY6w0w.-d1ZIV6MSQD0J72h.0_iT9JEloDBGmZuS8x5ngDgdN78I-P_iBi6HjpoVXl11WaxQeqXrba5oFAUiUujRZM9_sn13kOfzWzMFNjXj21T3aImCt547rU0XtVYBCROv9M9Xx7CJiLEJwPHoV6c15QW-KhtIH1zXvenF3muuc4rGxDKkmOO643fEPF5LeH5p_kUPDwGHkdv_cvPjD7BcdNq6YfXcmR3bD4hSFPt5-UbLA9qrUiRPDVXEszN5hVA9TqLqiW7WkgzSLPfOxjQgI9w1PkEiY-ceBcUb7elr5DaaqXa7csnLwquMJ0G7Oeuc2a4HaXFSO027X8sv05pBv6lBra-zx6SG_QjI_xSpw6fMVPkj8bUQDIiHZQSHtFcl7hdv9yb--U5MTSOY0qqkCXvUgC6jijzjfPZcL0jKR6Y2Bks7PnNXSAychiIo1sCsxyYE53GHIr8l4LvhdCl85AMUlzP3fjfDZlnjGmPZHB50OvOy2g.lVqxU4ydnwfk8x-v9cp5Sg; bm_mi=AA82B4BFCCFD9CEFE8C1FE329559D9E1~KmUhXYWf/vJh1M0jM/WHyXbVEEtn07KzlECt6VPo4or2vBIQeJmM5Ne/S8DdtmJSHQLJly+pd/oICw9oXn6DS1wwt5h4p5MRLaRtrU8GRfR5HY9IezPfef0qZ6bKmgMZ+e/+vgRTL88+PPg3o96NGG838nZ2WvpdrbNHPVMpjF/7RycFFnzXAagsCEw9C97wp5Clb5aAAtwzO2/2FK1T42O9/s+fOjxGmKdzpN9aOZ5jh3tJAlJFSGtEPOQCdpvP; bm_sv=B7450F1009CE378CC9912CB5CFFF99E0~gFxM5Hln49k0+41bX04RgEntzhhTk4WrSkDA1zaRrhJCHSCYHO4umkoVmejUIpeLrI3foDY/OR+EuEZRjYkNQQjXPGOFprElw5UCWYXIIBDJX6OI0Pp5AmK8wLp/+VZpHTwuhV9R4/fv+NGVjSsPbUecHmJHZvFyIiVTOvZC4lU=; bm_sz=078AB8C3422DD30C43CF385CCB0730B8~YAAQhBkVAtE70xZ3AQAAY7TcOgoDLAgcKZki5v2mOHaP7aXm9w9kCSk/UAITIC8lUc8p0tnIqKrU81NkzoZCJqXF+bSUZ6yqBrPEKulQb9p8cfqbQYo/T3OdXuw/+X2P16z9CYdT/F+lcbNIzC8hrrrsshLflaLMdTGIZaSNIPAm6AR7hHVYq26daP3LN5iUkVHCMA==; comid=cod; new_SiteId=cod; pgacct=psn; tfa_enrollment_seen=true; API_CSRF_TOKEN=c10b8803-2cca-44f3-ac3b-31bf2800ccbb`
  );

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  const inisec = ini / 1000;
  const finsec = fin / 1000;
  const encodeduser = encodeURIComponent(userid);
  return fetch(
    `https://my.callofduty.com/api/papi-client/crm/cod/v2/title/mw/platform/${platform}/gamer/${encodeduser}/matches/wz/start/0/end/0/details`,
    requestOptions
  )
    .then((response) => response.json())
    .then((result) => {
      const { status, data } = result;
      if (status === "success") {
        const promises = [];
        data.matches.forEach((match) => {
          if (
            match.utcStartSeconds > inisec &&
            match.utcStartSeconds < finsec &&
            match.mode === "br_brtrios" // Preparar para mete el modo del torneo
          ) {
            const { matchID } = match;
            const { team } = match.player;
            promises.push(
              new Promise((resolve) =>
                getMatchTeamStats(matchID, team, resolve)
              )
            );
          }
        });
        return promises;
        // console.log('parsedMatches', parsedMatches)
      } else throw "State: Error | La peticion a cod devolvio error";
    });
};

export default async function handler(req, res) {
  const {
    query: { tourid },
  } = req;

  // cambiar "topay" por "payed"
  // const tour = await getTournament(tourid);
  const tourTeams = await getTourTeams(tourid);
  console.log("tourTeams", tourTeams);
  const promises = tourTeams.map((team) => {
    return new Promise((resolve) => {
      if (team.users && team.users.length > 0) {
        getDBUser(team.users[0].user)
          .then((user) => {
            getUserMatches(
              user.gameid,
              user.cod.platform,
              new Date("02/14/2021 14:30:00").getTime(),
              new Date("02/14/2021 18:30:00").getTime()
              // 1612120244000,//1612134244000, //sera tour.fecha
              // 1612135244000//1612140205000  // sera tour.fecha + tiempo del torneo
            )
              .then((promises2) => {
                Promise.all(promises2)
                  .then((matches) => {
                    const onlyTeamMatches = matches.filter((match) => {
                      let correct = true;
                      if (match.teamMatch.length !== team.users.length)
                        correct = false;
                      else {
                        team.users.forEach((user) => {
                          if (
                            !match.teamMatch.some(
                              (elem) =>
                                elem.username === user.gameid ||
                                elem.username === user.secondaryGameId
                            )
                          )
                            correct = false;
                        });
                      }
                      return correct;
                    });
                    onlyTeamMatches.sort(
                      (param1, param2) => param2.points - param1.points
                    );
                    const onlyTourMatches = onlyTeamMatches.slice(0, 3); // Cambiar 3 x numero de partidas del torneo
                    const totalPoints = onlyTourMatches.reduce(
                      (acc, match) => (acc += match.points),
                      0
                    );
                    const userStats = [
                      {
                        team,
                        matches: onlyTourMatches,
                        totalPoints,
                      },
                    ];
                    console.log("userStats", userStats);
                    resolve(userStats);
                  })
                  .catch((e) => console.log(e));
              })
              .catch((e) => console.log(e));
          })
          .catch((e) => console.log(e));
      } else {
        resolve();
      }
    });
  });

  console.log("----------->", promises);
  Promise.all(promises)
    .then((teamsStats) => {
      console.log(teamsStats);
      const NotNullStats = teamsStats.filter((a) => a);
      let stats = [];
      NotNullStats.forEach((teamStats) => {
        if (teamStats) stats = [...teamStats, ...stats];
      });
      stats.sort((param1, param2) => param2.totalPoints - param1.totalPoints);
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      setTourStats(tourid, stats);
      res.end(JSON.stringify(stats));
    })
    .catch((e) => console.log(e));
}
