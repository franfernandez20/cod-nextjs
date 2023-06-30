import { useState, useEffect } from "react";
import Link from "next/link";
import useUser from "../../hooks/useUser";

import * as codTournamentService from "../../services/codtournamentService";

import Button from "../../components/elements/Button";
import { createDBUser, unregisterUser } from "../../firebase/client";

const FullMatch = ({ matchID }) => {
  useEffect(() => {
    console.log("user", user);
    console.log({ matchID });

    codTournamentService
      .getLastMatches(user.gameid, user.platform)
      .then((result) => {
        setMatchs(result);
        console.log("r esult", result);
      });
  }, []);

  return <a>{matchID}</a>;
};

export default function Stats() {
  const [user, logOut, updateUser] = useUser();
  const [matchs, setMatchs] = useState([]);
  const [matchID, setMatchID] = useState(null);

  useEffect(() => {
    console.log("user", user);
    console.log({ matchID });
    if (user) {
      // codTournamentService.getUserFullMatchs(user.gameid, user.platform).then((result) => {
      //   setMatchs(result)
      //   console.log('result', result)
      // })
      codTournamentService
        .getLastMatches(user.gameid, user.platform)
        .then((result) => {
          setMatchs(result);
          console.log("r esult", result);
        });
    }
    return function cleanUp() {
      setMatchID(null);
    };
  }, []);

  return (
    <>
      <section className="settings section center-content">
        <div className="container-sm">
          <div className="settings-inner">
            <h2
              className="mt-0 mb-16 reveal-from-bottom has-bottom-divider"
              data-reveal-delay="200"
            >
              Estadísticas
            </h2>
            {user && user.cod ? (
              <div className="mt-24 ta-c-mobile">
                <span className="text-color-secondary font-elect margin-left-64-desktop">
                  {user.gameid}
                </span>
                <>
                  {matchID === null ? (
                    <>
                      {matchs.map((match) => (
                        <div onClick={() => setMatchID(match.matchID)}>
                          <h3>
                            {match.kills} -{" "}
                            {new Date(
                              match.utcStartSeconds * 1000
                            ).toLocaleDateString("es-ES", {
                              weekday: "short",
                              month: "short",
                              day: "numeric",
                            })}
                          </h3>
                          <h4>
                            {match.mode} -- {match.teamPlacement}
                          </h4>
                        </div>
                      ))}
                    </>
                  ) : (
                    <FullMatch matchID={matchID} />
                  )}
                </>
              </div>
            ) : (
              <h4 className=" text-color-low mt-24 mb-32 reveal-from-top">
                Debes registrar un gameId para acceder a esta sección
              </h4>
            )}
            <Link href="/">
              <h4 className=" text-color-primary fw-500 tt-underline mt-32 mb-16">
                Volver
              </h4>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
