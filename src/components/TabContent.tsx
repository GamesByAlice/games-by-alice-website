import { useState, useEffect } from "react";
import TabSection from "./TabSection";
import Learn from "./Learn";
import MarkdownParser from "./MarkdownParser";
import { tabConfigs } from "../data/tabConfig";
import "./TabContent.css";

import aboutMeContent from "../articles/about-me.md?raw";
import projectsContent from "../articles/projects.md?raw";
import contactContent from "../articles/contact.md?raw";

interface TabContentProps {
  activeTab: string;
  isDarkMode: boolean;
}

function TabContent({ activeTab, isDarkMode }: TabContentProps) {
  const [markdownContent, setMarkdownContent] = useState<string>("");
  const activeTabConfig = tabConfigs.find(tab => tab.id === activeTab);

  useEffect(() => {
    switch (activeTab) {
      case "about-me-tab":
        setMarkdownContent(aboutMeContent);
        break;
      case "projects-tab":
        setMarkdownContent(projectsContent);
        break;
      case "contact-tab":
        setMarkdownContent(contactContent);
        break;
      default:
        setMarkdownContent("");
    }
  }, [activeTab]);

  if (!activeTabConfig) {
    return <main className="content">Tab not found</main>;
  }

  if (activeTab === "learn-tab") {
    return (
      <main className="tab-content-learn content-container">
        <div className="learn-container">
          <h1 className="learn-header title">{activeTabConfig.title}</h1>
          <Learn isDarkMode={isDarkMode} />
        </div>
      </main>
    );
  }

  if (markdownContent) {
    return (
      <main className="content tab-content">
        <TabSection title={activeTabConfig.title}>
          <MarkdownParser markdown={markdownContent} />
        </TabSection>
      </main>
    );
  }

  return (
    <main className="content tab-content">
      <TabSection title={activeTabConfig.title}>
        <p>{activeTabConfig.content}</p>
      </TabSection>
    </main>
  );
}

export default TabContent;