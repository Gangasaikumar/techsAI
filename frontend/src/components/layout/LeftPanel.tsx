import profileImg from "../../assets/profile.jpg";
import "../../styles/LeftPanel.css";

const LeftPanel = () => {
  return (
    <div className="left-panel-container">
      <div className="left-panel-overlay"></div>
      <img src={profileImg} alt="Profile" className="left-panel-img" />
    </div>
  );
};

export default LeftPanel;
