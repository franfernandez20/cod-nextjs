import React from "react";
import Card from "./Card";
import classNames from "classnames";

const torneos = [
  {
    type: "Tríos",
    kd: "2.0",
    inscripcion: "5",
    fecha: "Domingo 28 Febrero",
    mapa: "Verdansk",
  },
  {
    type: "Tríos",
    kd: "1.5",
    inscripcion: "1",
    fecha: "Domingo 28 Febrero",
    mapa: "Verdansk",
  },
  {
    type: "Dúos",
    kd: "2.0",
    inscripcion: "1",
    fecha: "Domingo 28 Febrero",
    mapa: "Verdansk",
  },
];

export default function CardList({ alt, src, text, list }) {
  return (
    // <div class="doughnut-component">
    //     <div class="doughnut__wrapper">
    //         <iframe class="chartjs-hidden-iframe" tabindex="-1" style={{display:'block', overflow: 'hidden', border: '0px', margin: '0px', inset: '0px', height: '100%', width: '100%', position: 'absolute', pointerEvents: 'none', zIndex: '-1' }}></iframe>

    //         <canvas id="dd" width="125" height="125" class="doughnutd doughnut-stat-summary" style={{display: 'block'}}></canvas>
    //     </div>
    //     <div class="doughnut__details">
    //         <div class="stat-summary-chart__stat mw">1.20</div>
    //         <div class="stat-summary-chart__label">Prop. B/M</div>
    //     </div>
    // </div>
    <section className="dale_padding">
      <div className="player-page main-content-inner inner-wrapper">
        <div className="recent-matches-container">
          <div className="recentmatches-page">
            <div className="page-wrapper recentmatches-last-matches">
              <div className="page-wrapper recentmatches-last-matches">
                <ul className="recentmatches-listing card_basic">
                  {list && list.map((tournament) => <Card tournament={tournament} />)}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
// "display: block; overflow: hidden; border: 0px; margin: 0px; inset: '0px', height: '100%', width: '100%', position: 'absolute', pointer-events: 'none', z-index: '-1'"
