import { useState, useEffect } from "react";
import Header from "./components/Header";
import TabNavigation from "./components/TabNavigation";
import TabContent from "./components/TabContent";
import Footer from "./components/Footer";
import { tabConfigs } from "./data/tabConfig";
import "./App.css";

function App() {
  const [activeTab, setActiveTab] = useState("about");

  useEffect(() => {
    const hash = window.location.hash.slice(1);
    const validTabIds = tabConfigs.map(tab => tab.id);
    if (hash && validTabIds.includes(hash)) {
      setActiveTab(hash);
    }
  }, []);

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    window.location.hash = tab;
  };

  return (
    <>
      <Header title="Placeholder Title" tagline="Placeholder tag line." />
      <TabNavigation activeTab={activeTab} onTabClick={handleTabClick} />
      <TabContent activeTab={activeTab} />
      <Footer name="Ryan Dugie" year={2025} />
    </>
  );
}

export default App;
