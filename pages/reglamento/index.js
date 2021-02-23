import classNames from "classnames";
import { SectionSplitProps } from "../../utils/SectionProps";
import Link from "next/link";
import SectionHeader from "../../components/sections/partials/SectionHeader";
import Image from "../../components/elements/Image";

// import dd from ""

export default function Reglamento({
  className,
  topOuterDivider,
  bottomOuterDivider,
  topDivider,
  bottomDivider,
  hasBgColor,
  invertColor,
  invertMobile,
  invertDesktop,
  alignTop,
  imageFill,
  pushLeft,
  ...props
}) {
  const outerClasses = classNames(
    "features-split section",
    topOuterDivider && "has-top-divider",
    bottomOuterDivider && "has-bottom-divider",
    hasBgColor && "has-bg-color",
    invertColor && "invert-color",
    className
  );

  const innerClasses = classNames(
    "features-split-inner section-inner",
    topDivider && "has-top-divider",
    bottomDivider && "has-bottom-divider"
  );

  const splitClasses = classNames(
    "split-wrap",
    invertMobile && "invert-mobile",
    invertDesktop && "invert-desktop",
    alignTop && "align-top"
  );

  const sectionHeader = {
    title: "Reglamento torneos",
    // paragraph:
    //   "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum — semper quis lectus nulla at volutpat diam ut venenatis.",
  };

  const tilesClasses = classNames(
    "tiles-wrap center-content",
    pushLeft && "push-left"
  );

  return (
    <section {...props} className={outerClasses}>
      <div className="container">
        <div className={innerClasses}>
          <SectionHeader data={sectionHeader} className="center-content" />
          <div className={splitClasses}>
            <div className="split-item">
              <div
                className="split-item-content center-content-mobile reveal-from-left"
                data-reveal-container=".split-item"
              >
                <div className="text-xxs text-color-primary fw-600 tt-u mb-8">
                  _________________________________________
                </div>
                <h3 className="mt-0 mb-12">Registro en nuestro sistema</h3>
                <p className="m-0">
                  Debes estar registrado en esta página con tu usuario de PSN o
                  Activision. Para ello es requisito tener habilitado el perfil
                  público en los servicios de call of dutty.
                </p>
                <div className="tt-underline mt-16">
                  <Link href="https://profile.callofduty.com/cod/login">
                    www.CallOfDuty.com
                  </Link>
                </div>
              </div>
              <div
                className={classNames(
                  "split-item-image center-content-mobile reveal-from-bottom",
                  imageFill && "split-item-image-fill"
                )}
                data-reveal-container=".split-item"
              >
                <Image
                  //   src={require(".//images/controller1-01.png")}
                  src="/images/person2.jpg"
                  alt="Features split 01"
                  width={528}
                  height={396}
                />
              </div>
            </div>
            <div className="split-item">
              <div
                className="split-item-content center-content-mobile reveal-from-left"
                data-reveal-container=".split-item"
              >
                <div className="text-xxs text-color-primary fw-600 tt-u mb-8">
                  _________________________________________
                </div>
                <h3 className="mt-0 mb-12">Crea tu TEAM</h3>
                <p className="m-0">
                  Para apuntarte a un torneo debes crear un equipo. Dale un
                  nombre y compártelo con tus compañeros. Ellos deben buscarlo y
                  añadirse a él. No olvidéis calcular la suma de vuestro K/D, si
                  superáis el máximo del torneo no podréis completar el equipo.
                </p>
              </div>
              <div
                className={classNames(
                  "split-item-image center-content-mobile reveal-from-bottom",
                  imageFill && "split-item-image-fill"
                )}
                data-reveal-container=".split-item"
              >
                <Image
                  //   src={require(".//images/controller1-03.png")}
                  src="/images/person3.jpg"
                  alt="Features split 03"
                  width={528}
                  height={396}
                />
              </div>
            </div>
          </div>
          {/* -------------------------- */}

          <div className={tilesClasses}>
            <div className="tiles-item reveal-from-bottom">
              <div className="tiles-item-inner">
                <div className="features-tiles-item-header">
                  <div className="features-tiles-item-image mb-16">
                    <Image
                      src={"/images/controller1.svg"}
                      alt="Features tile icon 01"
                      width={64}
                      height={64}
                    />
                  </div>
                </div>
                <div className="features-tiles-item-content">
                  <h4 className="mt-0 mb-8">Jugadores mínimos</h4>
                  <p className="m-0 text-sm">
                    La realización de los torneos implica siempre un mínimo de
                    equipos participantes. En caso de suspenderse se devolverá
                    la inscripción o se acumulará para siguientes torneos, a
                    elección del usuario.
                  </p>
                </div>
              </div>
            </div>

            <div
              className="tiles-item reveal-from-bottom"
              data-reveal-delay="200"
            >
              <div className="tiles-item-inner">
                <div className="features-tiles-item-header">
                  <div className="features-tiles-item-image mb-16">
                    <Image
                      src={"/images/controller4.svg"}
                      alt="Features tile icon 02"
                      width={64}
                      height={64}
                    />
                  </div>
                </div>
                <div className="features-tiles-item-content">
                  <h4 className="mt-0 mb-8">GameId detalles</h4>
                  <p className="m-0 text-sm">
                    Tu cuenta debe tener un mínimo de 100 partidas. Además tu
                    media de las ultimas partidas no puede diferir notablemente
                    de tu media global. Se considerará "Reverse Boosting"
                  </p>
                </div>
              </div>
            </div>

            <div
              className="tiles-item reveal-from-bottom"
              data-reveal-delay="400"
            >
              <div className="tiles-item-inner">
                <div className="features-tiles-item-header">
                  <div className="features-tiles-item-image mb-16">
                    <Image
                      src={"/images/controller2.svg"}
                      alt="Features tile icon 03"
                      width={64}
                      height={64}
                    />
                  </div>
                </div>
                <div className="features-tiles-item-content">
                  <h4 className="mt-0 mb-8">Calidad de conexión</h4>
                  <p className="m-0 text-sm">
                    La organización no se hará responsable de la pérdida o mal
                    funcionamiento de la conexión del usuario. Os recomendamos
                    conectaros y comprobar vuestra conexión con antelación al
                    inicio del torneo.
                  </p>
                </div>
              </div>
            </div>

            {/* <div className="tiles-item reveal-from-bottom">
              <div className="tiles-item-inner">
                <div className="features-tiles-item-header">
                  <div className="features-tiles-item-image mb-16">
                    <Image
                      src={"/images/controller3.svg"}
                      alt="Features tile icon 04"
                      width={64}
                      height={64}
                    />
                  </div>
                </div>
                <div className="features-tiles-item-content">
                  <h4 className="mt-0 mb-8">Robust Workflow</h4>
                  <p className="m-0 text-sm">
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                    occaecat cupidatat.
                  </p>
                </div>
              </div>
            </div> */}

            <div
              className="tiles-item reveal-from-bottom"
              data-reveal-delay="200"
            >
              <div className="tiles-item-inner">
                <div className="features-tiles-item-header">
                  <div className="features-tiles-item-image mb-16">
                    <Image
                      src={"/images/controller4.svg"}
                      alt="Features tile icon 05"
                      width={64}
                      height={64}
                    />
                  </div>
                </div>
                <div className="features-tiles-item-content">
                  <h4 className="mt-0 mb-8">Incumplimiento de normas</h4>
                  <p className="m-0 text-sm">
                    La organización se reserva el derecho de expulsar al equipo
                    en caso de detectar el incumplimiento de alguna de las
                    normas. La expulsión conllevara la perdida de cualquier tipo
                    de premio.
                  </p>
                </div>
              </div>
            </div>

            <div
              className="tiles-item reveal-from-bottom"
              data-reveal-delay="400"
            >
              <div className="tiles-item-inner">
                <div className="features-tiles-item-header">
                  <div className="features-tiles-item-image mb-16">
                    <Image
                      src={"/images/controller5.svg"}
                      alt="Features tile icon 06"
                      width={64}
                      height={64}
                    />
                  </div>
                </div>
                <div className="features-tiles-item-content">
                  <h4 className="mt-0 mb-8">Sistema automatizado</h4>
                  <p className="m-0 text-sm">
                    Todos estos requisitos se calculan automáticamente por el
                    sistema al crear el equipo. No os dejara crear un equipo si
                    no los cumplís.
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* ------------------------ */}
        </div>
      </div>
    </section>
  );
}
