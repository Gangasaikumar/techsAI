import Carousel from "../common/Carousel";
import SectionContainer from "../layout/SectionContainer";
import { educationData } from "../../data/portfolioData";
import "../../styles/SectionCards.css";

const Education = () => {
  return (
    <SectionContainer id="education">
      <Carousel
        title="Education"
        subTitle="STUDIED AT"
        items={educationData}
        renderItem={(item) => (
          <div className="card-wrapper">
            <h3 className="card-title">{item.school}</h3>
            <p className="card-subtitle">{item.degree}</p>
            <p className="card-desc">{item.desc}</p>

            {/* Location Footer with Line */}
            <div className="card-footer">
              <div className="footer-line"></div>
              <span className="footer-text">{item.location}</span>
            </div>
          </div>
        )}
      />
    </SectionContainer>
  );
};

export default Education;
