import Link from "next/link";
import useUser from "../../hooks/useUser";

import Button from "../../components/elements/Button";
import { createDBUser, unregisterUser } from "../../firebase/client";

export default function Settings() {
  const [user, logOut, updateUser] = useUser();

  const handleLogOut = () => {
    const newuser = { ...user };
    newuser.cod = null;
    newuser.gameid = null;
    newuser.secondaryGameId = null;
    unregisterUser(user.uid, user.gameid);
    // TODO - Crear todos estos metodos en useUser| unregistreGameUser(uid)
    updateUser(newuser);
  };

  return (
    <>
      <section className="settings section center-content">
        <div className="container-sm">
          <div className="settings-inner">
            <h2
              className="mt-0 mb-16 reveal-from-bottom has-bottom-divider"
              data-reveal-delay="200"
            >
              Ajustes
            </h2>
            {user && user.cod ? (
              <div className="mt-24 ta-c-mobile">
                <Button
                  className="magin-bottom-8-mobile"
                  color="primary"
                  title={
                    user.tournaments.length > 0
                      ? "Debes borrarte de tus torneos"
                      : "Borrar usuario"
                  }
                  size="sm"
                  onClick={handleLogOut}
                  disabled={user.tournaments.length > 0}
                  wideMobile
                >
                  Borrar GameId asociado
                </Button>
                <span className="text-color-secondary font-elect margin-left-64-desktop">
                  {user.gameid}
                </span>
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
