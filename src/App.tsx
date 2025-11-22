import { useState, useEffect } from "react";
import Header from "./components/Header";
import TabNavigation from "./components/TabNavigation";
import TabContent from "./components/TabContent";
import Footer from "./components/Footer";
import { tabConfigs } from "./data/tabConfig";
import "./App.css";
import "./styles/shared.css";

function App() {
  const [activeTab, setActiveTab] = useState("about-me-tab");
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const hash = window.location.hash.slice(1);
    const validTabIds = tabConfigs.map(tab => tab.id);
    if (hash && validTabIds.includes(hash)) {
      setActiveTab(hash);
    }
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    window.location.hash = tab;
  };

  return (
    <div className="app-container">
      <Header title="Alice Dugie" tagline="Full-stack Software Engineer" isCollapsed={activeTab === 'learn-tab'} />
      <TabNavigation activeTab={activeTab} onTabClick={handleTabClick} isDarkMode={isDarkMode} onToggleDarkMode={() => setIsDarkMode(!isDarkMode)} />
      <div className="flex-1">
        <TabContent activeTab={activeTab} isDarkMode={isDarkMode} />
      </div>
      <Footer name="Alice Dugie" year={2025} />
    </div>
  );
}

export default App;
