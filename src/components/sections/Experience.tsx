import Carousel from "../common/Carousel";
import SectionContainer from "../layout/SectionContainer";
import { experienceData } from "../../data/portfolioData";
import "../../styles/SectionCards.css";

const Experience = () => {
  return (
    <SectionContainer id="experience">
      <Carousel
        title="Experience"
        subTitle="WORKING WITH"
        items={experienceData}
        renderItem={(item) => (
          <div className="card-wrapper">
            <h3 className="card-title">{item.company}</h3>
            <p className="card-subtitle">{item.duration}</p>
            <p className="card-desc">{item.desc}</p>
          </div>
        )}
      />
    </SectionContainer>
  );
};

export default Experience;
