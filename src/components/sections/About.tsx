import SectionContainer from "../layout/SectionContainer";
import { aboutData } from "../../data/portfolioData";
import "../../styles/About.css";
import SectionHeader from "../common/SectionHeader";

const About = () => {
  const { title, subTitle, bio, details } = aboutData;

  return (
    <SectionContainer id="about">
      <SectionHeader title={title} subtitle={subTitle} />

      <p className="about-bio">{bio}</p>

      {/* Info Grid Box */}
      <div className="about-info-grid">
        {/* Left Column Stack */}
        <div className="about-col">
          {/* Name Row */}
          <div className="info-row">
            <span className="info-label">Name :</span>
            <span className="info-value">{details.name}</span>
          </div>

          {/* Residence Row */}
          <div className="info-row">
            <span className="info-label">Residence :</span>
            <span className="info-value">{details.residence}</span>
          </div>

          {/* Email Row */}
          <div className="info-row no-border-mobile">
            <span className="info-label">E-mail:</span>
            <span className="info-value-dim">{details.email}</span>
          </div>
        </div>

        {/* Right Column: Address */}
        <div className="about-col">
          <div className="info-row no-border-bottom">
            <span className="info-label">Address :</span>
            <span className="info-value info-address">
              {details.address.line1}
              <br />
              {details.address.line2}
              <br />
              {details.address.line3}
              <br />
              {details.address.line4}
              <br />
              {details.address.phone}
            </span>
          </div>
        </div>
      </div>
    </SectionContainer>
  );
};

export default About;
