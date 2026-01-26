export interface EducationItem {
  id: number;
  school: string;
  degree: string;
  desc: string;
  location: string;
}

export interface ExperienceItem {
  id: number;
  company: string;
  duration: string;
  desc: string;
}

export interface NavLink {
  id: string;
  label: string;
}

export interface CodingSkillItem {
  id: number;
  title: string;
  percent: number;
  category: string;
  desc: string;
}

export interface AboutDetails {
  name: string;
  residence: string;
  email: string;
  address: {
    line1: string;
    line2: string;
    line3: string;
    line4: string;
    phone: string;
  };
}

export interface AboutData {
  title: string;
  subTitle: string;
  bio: string;
  details: AboutDetails;
}

export interface DesignSkillItem {
  id: number;
  category: string;
  tool: string;
  percent: number;
  desc: string;
}

export interface PortfolioItem {
  id: number;
  title: string;
  category: string;
  img: string;
  link: string;
  desc: string;
}
