import AwesomeSlider from "react-awesome-slider";
import withAutoplay from "react-awesome-slider/dist/autoplay";

import "./carousel.css";
import "react-awesome-slider/dist/styles.css";

const AutoplaySlider = withAutoplay(AwesomeSlider);
const carouselItems = [
  {
    id: "1",
    component: () => (
      <h1>
        <span>Recording</span> Your Meetings Has Never Been So Easy
      </h1>
    ),
    componentStyles: {
      background: 'rgba(0, 0, 0, 0.3) url("./images/33.jpg")',
    },
  },
  {
    id: "2",
    component: () => (
      <h1>
        Accurate <span>Transcription </span>
        Of
        <br />
        Audio In Your Hands
      </h1>
    ),
    componentStyles: {
      background: 'rgba(0, 0, 0, 0.4) url("./images/14.jpg")',
    },
  },
  {
    id: "3",
    component: () => (
      <h1>
        <span>Increase</span> Employee Engagement Rate Without Spending An Extra
        Buck
      </h1>
    ),
    componentStyles: {
      background: 'rgba(0, 0, 0, 0.3) url("./images/ch.png")',
    },
  },
  {
    id: "4",
    component: () => (
      <h1>
        {"We Will Always Be There To"}
        <br /> <span>Serve </span>You
      </h1>
    ),
    componentStyles: {
      background: 'rgba(0, 0, 0, 0.4) url("./images/13.png")',
    },
  },
  {
    id: "5",
    component: () => (
      <div className=" fifth">
        <h1>
          <span>GROWTH </span> THAT IS ALWAYS SOARING AND RAISING THE BAR FOR
          COMPETITORS
        </h1>
      </div>
    ),
    componentStyles: {
      background: 'rgba(0, 0, 0, 0.2) url("./images/6.jpg")',
    },
  },
];

const Carousel = (props) => {
  const {
    play = true,
    bullets = false,
    infinite = true,
    interval = 200,
    carouselComponents = [],
    containerClassName = "carouselContainer",
    cancelOnInteraction = true,
  } = props;

  return (
    <AutoplaySlider
      play={true}
      interval={2000}
      bullets={false}
      infinite={true}
      className={containerClassName}
      cancelOnInteraction={true} // should stop playing on user interaction
    >
      {carouselComponents.map(({ id, component, componentStyles }) => {
        return (
          <div
            key={id}
            style={componentStyles}
            className={"componentContainer"}
          >
            {component}
          </div>
        );
      })}
    </AutoplaySlider>
  );
};

export default Carousel;
