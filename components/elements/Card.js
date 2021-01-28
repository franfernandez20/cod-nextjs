import { useContext } from "react";
import { useRouter } from 'next/router'
import { store } from "../../hooks/store";

export default function Card({ tournament }) {
  const router = useRouter()
  const globalState = useContext(store);
  const { state, dispatch } = globalState;

  const { modo, kdmax, prize, fecha, mapa, payed, topay, visible } = tournament;
  const total = payed.length + topay.length;

  const handleTournamentSelect = () => {
    dispatch({ type: "setTournament", value: tournament });
    router.push({
      pathname: '/tournaments/[id]',
      query: { id: tournament.id },
    })    
  };

  return (
    <>
      {tournament && visible && (
        <li
          className="recentmatches-listing__item item-active card_basic"
          onClick={handleTournamentSelect}
        >
          <div className="recentmatches-listing__summary">
            <div className="match-details-list-component">
              <ul className="match-details-listing card_basic">
                <li className="match-details-listing__item warzone card_basic">
                  <div
                    className="match-details-listing__gameIcon"
                    style={{
                      backgroundImage:
                        'url("https://www.callofduty.com/cdn/app/icons/mw/modes/wz_br_brtrios.png")',
                    }}
                  ></div>
                  <div className="match-details-listing__content">
                    <div className="match-details-listing__map">{mapa}</div>
                    <div className="match-details-listing__mode">
                      BR - {modo}
                    </div>
                    <div className="match-details-listing__timestamp">
                      {new Date(fecha).toLocaleDateString()} |{" "}
                      {new Date(fecha).toLocaleTimeString()}
                    </div>
                    <div className="match-details-listing__placement warzone loss">
                      <span className="text-color-success">
                        {total > 48 ? total : 48}
                      </span>
                      <span className="text-color-low">/150</span>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
            <div className="match-stats-list-component">
              <ul className="match-stats-listing card_basic">
                <li className="match-stats-listing__item warzone card_basic">
                  <div className="match-stats-listing__title">K/D Máximo</div>
                  <div className="match-stats-listing__stat">{kdmax}</div>
                </li>
                <li className="match-stats-listing__item warzone card_basic">
                  {/* <div className="match-stats-listing__title"></div> */}
                  <div className="match-stats-listing__stat"></div>
                </li>
                <li className="match-stats-listing__item warzone card_basic">
                  <div className="match-stats-listing__title">Inscripción</div>
                  <div className="match-stats-listing__stat">{prize}€</div>
                </li>
              </ul>
            </div>
            <div
              className="recentmatches-listing__bgimg"
              style={{
                backgroundImage:
                  'url("https://www.callofduty.com/cdn/app/base-maps/mw/mp_don3.jpg")',
              }}
            ></div>
          </div>
        </li>
      )}
    </>
  );
}
