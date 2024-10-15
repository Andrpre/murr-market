import { scroller } from "react-scroll";

const ScrollToSection = (sectionId: string) => {
  scroller.scrollTo(sectionId, {
    duration: 800,
    delay: 0,
    offset: -120,
    smooth: "easeInOutQuart",
  });
};

export default ScrollToSection;
