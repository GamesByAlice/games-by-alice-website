export interface TabConfig {
  id: string;
  label: string;
  title: string;
  content: string;
}

export const tabConfigs: TabConfig[] = [
  {
    id: "about-me-tab",
    label: "About Me",
    title: "About Me",
    content: ""
  },
  {
    id: "projects-tab",
    label: "Projects",
    title: "Portfolio",
    content: ""
  },
  {
    id: "learn-tab",
    label: "Learn",
    title: "Tutorials",
    content: ""
  },
  {
    id: "contact-tab",
    label: "Contact",
    title: "Contact",
    content: ""
  }
];