export default function CodKD({ alt, src, kdRatio }) {
  return (
    <div className="initial">
      <div className="kd-circle-outer">
      <div className="kd-circle">
        <span className="kd-ratio">{Math.floor(kdRatio * 100) / 100}</span>
        <span className="prop-bm">PROP. B/M</span>
      </div>
      </div>
      {/* <div id="kd-outer-circle2">
        <div id="kd-inner-circle"></div>
      </div> */}
      {/* <div class="container">
        <div class="donut-chart-block block">
          <div class="donut-chart">
            <div id="part1" class="portion-block">
              <div class="circle"></div>
            </div>
            <div id="part2" class="portion-block">
              <div class="circle"></div>
            </div>
            <div id="part3" class="portion-block">
              <div class="circle"></div>
            </div>
            <p class="center">
              <span> {Math.floor(kdRatio * 100) / 100}</span> <span>Prop. B/M</span>
            </p>
          </div>
        </div>
      </div> */}
    </div>
  );
}
