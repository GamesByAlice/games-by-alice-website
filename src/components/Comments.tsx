import Giscus from '@giscus/react';
import '../styles/shared.css';
import './Comments.css';

interface CommentsProps {
  articleId: string;
  isDarkMode?: boolean;
}

function Comments({ articleId, isDarkMode }: CommentsProps) {
  return (
    <div className="comments-container">
      <Giscus
        repo="GamesByAlice/games-by-alice-website"
        repoId="R_kgDOQPTsmw"
        category="General"
        categoryId="DIC_kwDOQPTsm84CyFrZ"
        mapping="specific"
        term={articleId}
        reactionsEnabled="0"
        emitMetadata="1"
        inputPosition="top"
        theme={isDarkMode ? 'dark' : 'light'}
        lang="en"
      />
    </div>
  );
}

export default Comments;