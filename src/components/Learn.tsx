import { useState, useEffect } from "react";
import { tutorials, Tutorial } from "../data/tutorialData";
import MarkdownParser from './MarkdownParser';
import Comments from './Comments';
import welcomeContent from '../articles/learn-welcome.md?raw';
import DOMPurify from 'dompurify';
import '../styles/shared.css';
import './Learn.css';

interface LearnProps {
  isDarkMode: boolean;
}

function Learn({ isDarkMode }: LearnProps): JSX.Element {
  const [selectedTutorial, setSelectedTutorial] = useState<Tutorial | null>(null);
  const [showWelcome, setShowWelcome] = useState(true);

  useEffect(() => {
    try {
      const hash = window.location.hash.slice(1);
      if (hash.startsWith('learn-tab/')) {
        const pathParts = hash.split('/');
        if (pathParts.length >= 3 && pathParts[1] === 'rust-basics') {
          const articleId = pathParts[2];
          const tutorial = tutorials.find(t => t.id === articleId);
          if (tutorial) {
            setSelectedTutorial(tutorial);
            setShowWelcome(false);
          }
        }
      }
    } catch (error) {
      console.error('Error parsing URL hash:', error);
    }
  }, []);

  const rustBasicsTutorials = tutorials.filter(t => ['hello-world'].includes(t.id));

  const renderContent = () => {
    try {
      if (selectedTutorial) {
        return (
          <div>
            <div className="tutorial-meta">
              <span>{selectedTutorial.date}</span>
              <span>•</span>
              <span>{selectedTutorial.difficulty}</span>
            </div>
            <article>
              <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(selectedTutorial.content) }} />
            </article>
            <Comments articleId={selectedTutorial.id} isDarkMode={isDarkMode} />
          </div>
        );
      }

      if (showWelcome) {
        return <MarkdownParser markdown={welcomeContent} />;
      }

      return null;
    } catch (error) {
      console.error('Error rendering content:', error);
      return <div>Error loading content</div>;
    }
  };

  return (
    <div className="learn-layout">
      <nav className="learn-nav">
        <ul className="learn-nav-list">
          <li className="learn-nav-item">
            <button
              onClick={() => {
                setShowWelcome(true);
                setSelectedTutorial(null);
                window.location.hash = 'learn-tab';
              }}
              className={`learn-nav-button nav-button ${showWelcome && !selectedTutorial ? 'active' : ''}`}
            >
              Welcome
            </button>
          </li>
          <li className="learn-nav-item">
            <details open>
              <summary className="learn-section-summary section-summary">
                Rust Basics
              </summary>
              <ul className="learn-subsection-list">
                {rustBasicsTutorials.map(tutorial => (
                  <li key={tutorial.id} className="learn-subsection-item">
                    <button
                      onClick={() => {
                        setSelectedTutorial(tutorial);
                        setShowWelcome(false);
                        window.location.hash = `learn-tab/rust-basics/${tutorial.id}`;
                      }}
                      className={`learn-subsection-button subsection-button ${selectedTutorial?.id === tutorial.id ? 'active' : ''}`}
                    >
                      {tutorial.title}
                    </button>
                  </li>
                ))}
              </ul>
            </details>
          </li>
          <li>
            <details open>
              <summary className="learn-section-summary section-summary">
                Game Development
              </summary>
              <ul className="learn-subsection-list">
                <li className="coming-soon text-gray">
                  Coming soon!
                </li>
              </ul>
            </details>
          </li>
        </ul>
      </nav>
      <main className="learn-main content-container">
        {renderContent()}
      </main>
    </div>
  );
}

export default Learn;