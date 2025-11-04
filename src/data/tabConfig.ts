export interface TabConfig {
  id: string;
  label: string;
  title: string;
  content: string;
}

export const tabConfigs: TabConfig[] = [
  {
    id: "about",
    label: "About Me",
    title: "About Me",
    content: "Placeholder about me information."
  },
  {
    id: "portfolio",
    label: "Portfolio", 
    title: "Portfolio",
    content: "Placeholder list of professional and personal projects."
  },
  {
    id: "blog",
    label: "Blog",
    title: "Blog", 
    content: "Placeholder list of articles."
  },
  {
    id: "contact",
    label: "Contact",
    title: "Contact",
    content: "Placeholder contact information."
  }
];