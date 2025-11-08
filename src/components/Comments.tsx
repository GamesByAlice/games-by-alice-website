import { useState, useEffect } from 'react';
import { generateClient } from 'aws-amplify/data';
import { Authenticator } from '@aws-amplify/ui-react';
import type { Schema } from '../../amplify/data/resource';
import type { AuthUser } from 'aws-amplify/auth';
import DOMPurify from 'dompurify';
import '../styles/shared.css';
import './Comments.css';

const client = generateClient<Schema>();

interface CommentsProps {
  articleId: string;
}

function Comments({ articleId }: CommentsProps) {
  const [comments, setComments] = useState<Array<Schema["Comment"]["type"]>>([]);
  const [newComment, setNewComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showAuthenticator, setShowAuthenticator] = useState(false);

  useEffect(() => {
    fetchComments();
  }, [articleId]);

  const fetchComments = async () => {
    try {
      if (!articleId) {
        console.warn('Cannot fetch comments: missing article identifier');
        return;
      }
      const { data } = await client.models.Comment.list({
        filter: { articleId: { eq: articleId } }
      });
      setComments(data.sort((a, b) => new Date(b.createdAt || '').getTime() - new Date(a.createdAt || '').getTime()));
    } catch (error) {
      console.error('Error fetching comments:', error);
      setComments([]);
    }
  };

  const handleSubmitComment = async (e: React.FormEvent, user: AuthUser) => {
    e.preventDefault();
    
    if (!newComment.trim() || !user) {
      return;
    }

    if (!articleId) {
      console.error('Cannot submit comment: missing article identifier');
      return;
    }

    setIsSubmitting(true);
    try {
      const sanitizedContent = DOMPurify.sanitize(newComment.trim());
      await client.models.Comment.create({
        articleId,
        content: sanitizedContent,
        authorName: user.username || 'Anonymous',
        createdAt: new Date().toISOString(),
      });
      setNewComment('');
      await fetchComments();
    } catch (error) {
      console.error('Error creating comment:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="comments-container">
      <h3 className="comments-title title">Comments</h3>

      {showAuthenticator ? (
        <Authenticator
          formFields={{
            signUp: {
              username: {
                order: 1,
                placeholder: 'Enter your username',
                label: 'Username',
                isRequired: true,
              },
              password: {
                order: 2,
              },
              confirm_password: {
                order: 3,
              },
            },
            signIn: {
              username: {
                placeholder: 'Enter your username',
                label: 'Username',
              },
            },
          }}
        >
          {({ user, signOut }) => (
            <form onSubmit={(e) => user && handleSubmitComment(e, user)} className="comment-form">
              <div className="user-info">
                Signed in as {user?.username || 'User'}
              </div>
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Write a comment..."
                rows={4}
                className="textarea"
              />
              <div className="form-actions">
                <button
                  type="submit"
                  disabled={!newComment.trim() || isSubmitting}
                  className="btn-submit"
                >
                  {isSubmitting ? 'Posting...' : 'Post Comment'}
                </button>
                <button
                  type="button"
                  onClick={async () => {
                    await signOut?.();
                    setShowAuthenticator(false);
                  }}
                  className="btn-secondary"
                >
                  Sign Out
                </button>
              </div>
            </form>
          )}
        </Authenticator>
      ) : (
        <div className="auth-prompt">
          <button
            onClick={() => setShowAuthenticator(true)}
            className="btn-primary"
          >
            Sign In to Comment
          </button>
        </div>
      )}

      <div>
        {comments.length === 0 ? (
          <p className="text-muted">
            No comments yet. Be the first to comment!
          </p>
        ) : (
          comments.map((comment) => (
            <div
              key={comment.id}
              className="comment-item"
            >
              <div className="comment-header">
                <strong className="comment-author">
                  {comment.authorName}
                </strong>
                <span className="comment-date">
                  {comment.createdAt ? new Date(comment.createdAt).toLocaleDateString() : 'Unknown date'}
                </span>
              </div>
              <p className="comment-content">
                {comment.content}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Comments;