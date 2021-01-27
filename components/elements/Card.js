import React from "react";

export default function Card({ type, kd, inscripcion, fecha, mapa }) {
  return (
    <li className="recentmatches-listing__item item-active card_basic">
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
              ></div>{" "}
              <div className="match-details-listing__content">
                <div className="match-details-listing__map">{mapa}</div>{" "}
                <div className="match-details-listing__mode">BR - {type}</div>{" "}
                <div className="match-details-listing__timestamp">{fecha}</div>{" "}
                <div className="match-details-listing__placement warzone loss">
                  <span>26</span>
                </div>
              </div>
            </li>
          </ul>
        </div>{" "}
        <div className="match-stats-list-component">
          <ul className="match-stats-listing card_basic">
            <li className="match-stats-listing__item warzone card_basic">
              <div className="match-stats-listing__title">K/D Máximo</div>{" "}
              <div className="match-stats-listing__stat">{kd}</div>
            </li>
            <li className="match-stats-listing__item warzone card_basic">
              {/* <div className="match-stats-listing__title"></div>{" "} */}
              <div className="match-stats-listing__stat"></div>
            </li>
            <li className="match-stats-listing__item warzone card_basic">
              <div className="match-stats-listing__title">Inscripción</div>{" "}
              <div className="match-stats-listing__stat">{inscripcion}€</div>
            </li>
          </ul>
        </div>{" "}
        <div
          className="recentmatches-listing__bgimg"
          style={{
            backgroundImage:
              'url("https://www.callofduty.com/cdn/app/base-maps/mw/mp_don3.jpg")',
          }}
        ></div>
      </div>
    </li>
  );
}
