import TabSection from "./TabSection";
import { tabConfigs } from "../data/tabConfig";

interface TabContentProps {
  activeTab: string;
}

function TabContent({ activeTab }: TabContentProps) {
  const activeTabConfig = tabConfigs.find(tab => tab.id === activeTab);

  if (!activeTabConfig) {
    return <main className="content">Tab not found</main>;
  }

  return (
    <main className="content">
      <TabSection title={activeTabConfig.title}>
        <p>{activeTabConfig.content}</p>
      </TabSection>
    </main>
  );
}

export default TabContent;