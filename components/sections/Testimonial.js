import React from "react";
import classNames from "classnames";
import { SectionTilesProps } from "../../utils/SectionProps";
import SectionHeader from "./partials/SectionHeader";

import LevelComponent from "../elements/LevelComponent";

const propTypes = {
  ...SectionTilesProps.types,
};

const defaultProps = {
  ...SectionTilesProps.defaults,
};

const Testimonial = ({
  className,
  topOuterDivider,
  bottomOuterDivider,
  topDivider,
  bottomDivider,
  hasBgColor,
  invertColor,
  pushLeft,
  ...props
}) => {
  const outerClasses = classNames(
    "testimonial section",
    topOuterDivider && "has-top-divider",
    bottomOuterDivider && "has-bottom-divider",
    hasBgColor && "has-bg-color",
    invertColor && "invert-color",
    className
  );

  const innerClasses = classNames(
    "testimonial-inner section-inner",
    topDivider && "has-top-divider",
    bottomDivider && "has-bottom-divider"
  );

  const tilesClasses = classNames("tiles-wrap", pushLeft && "push-left");

  const sectionHeader = {
    title: "Reglamento Torneos",
    paragraph:
      "En esta página encontrarás toda la información necesaria para participar en un torneo. Si tienes alguna duda contactar con nosotros a través de nuestras redes sociales",
  };
  const sectionHeaderA = {
    title: "500€",
  };
  const sectionHeaderB = {
    title: "1.000€",
  };
  const sectionHeaderC = {
    title: "150€",
  };

  return (
    <section {...props} className={outerClasses}>
      <div className="container">
        <div className={innerClasses}>
          <SectionHeader data={sectionHeader} className="center-content" />
          <div className={tilesClasses}>
            <div
              className="tiles-item reveal-from-right"
              data-reveal-delay="200"
            >
              <div className="tiles-item-inner">
                <div className="testimonial-item-content">
                  {/* <SectionHeader data={sectionHeaderA} className="center-content" /> */}
                  <LevelComponent kd={2} modo={"br_brtrios"} />
                  <div className="testimonial-item-footer text-xs mt-32 mb-0 has-top-divider"></div>
                  <div>
                    <span className="testimonial-item-name text-color-high">
                      Cuartetos
                    </span>
                    <span className="text-color-low"> | </span>
                    <span className="testimonial-item-link">
                      <a href="#0"> (0 - 5) </a>
                    </span>
                    <span className="text-color-low"> k/D </span>
                  </div>
                  <div>
                    <span className="testimonial-item-name text-color-high">
                      Tríos
                    </span>
                    <span className="text-color-low"> | </span>
                    <span className="testimonial-item-link ta-r">
                      <a href="#0"> (0 - 3.6)</a>
                    </span>
                    <span className="text-color-low"> k/D </span>
                  </div>
                  <div>
                    <span className="testimonial-item-name text-color-high">
                      Duós
                    </span>
                    <span className="text-color-low"> | </span>
                    <span className="testimonial-item-link">
                      <a href="#0"> (0 - 2.4)</a>
                    </span>
                    <span className="text-color-low"> k/D </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="tiles-item reveal-from-bottom">
              <div className="tiles-item-inner">
                <div className="testimonial-item-content">
                  {/* <SectionHeader data={sectionHeaderB} className="center-content" /> */}
                  <LevelComponent kd={5} modo={"br_brtrios"} />
                  <div className="testimonial-item-footer text-xs mt-32 mb-0 has-top-divider"></div>
                  <div>
                    <span className="testimonial-item-name text-color-high">
                      Cuartetos
                    </span>
                    <span className="text-color-low"> | </span>
                    <span className="testimonial-item-link">
                      <a href="#0"> (5 - 8) </a>
                    </span>
                    <span className="text-color-low"> k/D </span>
                  </div>
                  <div>
                    <span className="testimonial-item-name text-color-high">
                      Tríos
                    </span>
                    <span className="text-color-low"> | </span>
                    <span className="testimonial-item-link ta-r">
                      <a href="#0"> (3.6 - 6)</a>
                    </span>
                    <span className="text-color-low"> k/D </span>
                  </div>
                  <div>
                    <span className="testimonial-item-name text-color-high">
                      Duós
                    </span>
                    <span className="text-color-low"> | </span>
                    <span className="testimonial-item-link">
                      <a href="#0"> (2.4 - 4)</a>
                    </span>
                    <span className="text-color-low"> k/D </span>
                  </div>
                </div>
              </div>
            </div>

            <div
              className="tiles-item reveal-from-left"
              data-reveal-delay="200"
            >
              <div className="tiles-item-inner">
                <div className="testimonial-item-content">
                  {/* <SectionHeader data={sectionHeaderC} className="center-content" /> */}
                  <LevelComponent kd={9} modo={"br_brtrios"} />
                  <div className="testimonial-item-footer text-xs mt-32 mb-0 has-top-divider"></div>
                  <div>
                    <span className="testimonial-item-name text-color-high">
                      Cuartetos
                    </span>
                    <span className="text-color-low"> | </span>
                    <span className="testimonial-item-link">
                      <a href="#0"> (8 - 12) </a>
                    </span>
                    <span className="text-color-low"> k/D </span>
                  </div>
                  <div>
                    <span className="testimonial-item-name text-color-high">
                      Tríos
                    </span>
                    <span className="text-color-low"> | </span>
                    <span className="testimonial-item-link ta-r">
                      <a href="#0"> (6 - 9)</a>
                    </span>
                    <span className="text-color-low"> k/D </span>
                  </div>
                  <div>
                    <span className="testimonial-item-name text-color-high">
                      Duós
                    </span>
                    <span className="text-color-low"> | </span>
                    <span className="testimonial-item-link">
                      <a href="#0"> (4 - 6)</a>
                    </span>
                    <span className="text-color-low"> k/D </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

Testimonial.propTypes = propTypes;
Testimonial.defaultProps = defaultProps;

export default Testimonial;
