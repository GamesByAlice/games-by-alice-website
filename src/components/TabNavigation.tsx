import { tabConfigs } from "../data/tabConfig";

interface TabNavigationProps {
  activeTab: string;
  onTabClick: (tab: string) => void;
}

function TabNavigation({ activeTab, onTabClick }: TabNavigationProps) {
  return (
    <nav className="tabs">
      {tabConfigs.map(tab => (
        <button
          key={tab.id}
          className={`tab ${activeTab === tab.id ? "active" : ""}`}
          onClick={() => onTabClick(tab.id)}
        >
          {tab.label}
        </button>
      ))}
    </nav>
  );
}

export default TabNavigation;