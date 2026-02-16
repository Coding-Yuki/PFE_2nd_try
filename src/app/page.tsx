'use client';

import { useState, useEffect } from 'react';
import { Heart, MessageCircle, Send } from 'lucide-react';

interface Post {
  id: number;
  content: string;
  createdAt: string;
  author: {
    id: number;
    name: string;
    email: string;
    major: string;
    studentId: string;
  };
  likes: { userId: number }[];
  comments: { id: number }[];
}

interface Comment {
  id: number;
  content: string;
  createdAt: string;
  user: {
    id: number;
    name: string;
    major: string;
  };
}

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [newPostContent, setNewPostContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isPosting, setIsPosting] = useState(false);
  const [commentInputs, setCommentInputs] = useState<{ [key: number]: string }>({});
  const [showComments, setShowComments] = useState<{ [key: number]: boolean }>({});
  const [comments, setComments] = useState<{ [key: number]: Comment[] }>({});

  const fetchPosts = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/posts');
      if (response.ok) {
        const data = await response.json();
        setPosts(data);
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchComments = async (postId: number) => {
    try {
      const response = await fetch(`/api/posts/${postId}/comments`);
      if (response.ok) {
        const data = await response.json();
        setComments(prev => ({ ...prev, [postId]: data }));
      }
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  const handlePost = async () => {
    if (!newPostContent.trim()) return;

    try {
      setIsPosting(true);
      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: newPostContent }),
      });

      if (response.ok) {
        setNewPostContent('');
        await fetchPosts();
      }
    } catch (error) {
      console.error('Error creating post:', error);
    } finally {
      setIsPosting(false);
    }
  };

  const handleLike = async (postId: number) => {
    try {
      const response = await fetch(`/api/posts/${postId}/like`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ postId }),
      });

      if (response.ok) {
        const { liked } = await response.json();
        setPosts(prev => prev.map(post => {
          if (post.id === postId) {
            return {
              ...post,
              likes: liked 
                ? [...post.likes, { userId: 0 }] // Will be updated on refresh
                : post.likes.filter(like => like.userId !== 0)
            };
          }
          return post;
        }));
        await fetchPosts(); // Refresh to get accurate data
      }
    } catch (error) {
      console.error('Error toggling like:', error);
    }
  };

  const handleComment = async (postId: number) => {
    const content = commentInputs[postId]?.trim();
    if (!content) return;

    try {
      const response = await fetch(`/api/posts/${postId}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ postId, content }),
      });

      if (response.ok) {
        setCommentInputs(prev => ({ ...prev, [postId]: '' }));
        await fetchComments(postId);
        await fetchPosts();
      }
    } catch (error) {
      console.error('Error creating comment:', error);
    }
  };

  const toggleComments = async (postId: number) => {
    const shouldShow = !showComments[postId];
    setShowComments(prev => ({ ...prev, [postId]: shouldShow }));
    
    if (shouldShow && !comments[postId]) {
      await fetchComments(postId);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('fr-FR');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h1 className="text-2xl font-bold text-gray-900">Accueil</h1>
      </div>

      {/* Posting Box */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex space-x-3">
          <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-white font-bold">M</span>
          </div>
          <div className="flex-1">
            <textarea
              value={newPostContent}
              onChange={(e) => setNewPostContent(e.target.value)}
              placeholder="Quoi de neuf ?"
              className="w-full p-3 border border-gray-200 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
              rows={3}
              disabled={isPosting}
            />
            <div className="mt-3 flex justify-end">
              <button
                onClick={handlePost}
                disabled={!newPostContent.trim() || isPosting}
                className="bg-blue-600 hover:bg-blue-700 text-white rounded-full font-semibold px-6 py-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isPosting ? 'Publication...' : 'Publier'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Posts List */}
      <div className="space-y-4">
        {isLoading ? (
          <div className="bg-white rounded-xl shadow-sm p-8 text-center">
            <p className="text-gray-500">Chargement...</p>
          </div>
        ) : posts.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-8 text-center">
            <p className="text-gray-500">Aucune publication pour le moment. Soyez le premier à partager quelque chose !</p>
          </div>
        ) : (
          posts.map((post) => (
            <div key={post.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
              {/* Post Header */}
              <div className="flex items-start space-x-3">
                <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold">
                    {post.author.name.charAt(0).toUpperCase()}
                  </span>
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center space-x-1">
                    <h3 className="font-semibold text-gray-900 hover:underline cursor-pointer">
                      {post.author.name}
                    </h3>
                    <span className="text-gray-500">·</span>
                    <span className="text-sm text-gray-500">{post.author.major}</span>
                    <span className="text-gray-500">·</span>
                    <span className="text-sm text-gray-500">{formatDate(post.createdAt)}</span>
                  </div>

                  {/* Post Content */}
                  <p className="text-gray-900 mt-2 whitespace-pre-wrap">{post.content}</p>

                  {/* Post Actions */}
                  <div className="flex items-center space-x-6 mt-4">
                    <button
                      onClick={() => handleLike(post.id)}
                      className="flex items-center space-x-2 text-gray-600 hover:text-red-500 transition-colors group"
                    >
                      <Heart className={`h-5 w-5 group-hover:fill-red-500 ${post.likes.length > 0 ? 'fill-red-500 text-red-500' : ''}`} />
                      <span className="text-sm">{post.likes.length}</span>
                    </button>
                    
                    <button
                      onClick={() => toggleComments(post.id)}
                      className="flex items-center space-x-2 text-gray-600 hover:text-blue-500 transition-colors group"
                    >
                      <MessageCircle className="h-5 w-5 group-hover:fill-blue-500" />
                      <span className="text-sm">{post.comments.length}</span>
                    </button>
                  </div>

                  {/* Comments Section */}
                  {showComments[post.id] && (
                    <div className="mt-4 border-t border-gray-200 pt-4">
                      {/* Add Comment */}
                      <div className="flex space-x-3 mb-4">
                        <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-white font-bold text-sm">M</span>
                        </div>
                        <div className="flex-1 flex space-x-2">
                          <input
                            type="text"
                            value={commentInputs[post.id] || ''}
                            onChange={(e) => setCommentInputs(prev => ({ ...prev, [post.id]: e.target.value }))}
                            placeholder="Ajoutez un commentaire..."
                            className="flex-1 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50"
                            onKeyPress={(e) => {
                              if (e.key === 'Enter') {
                                handleComment(post.id);
                              }
                            }}
                          />
                          <button
                            onClick={() => handleComment(post.id)}
                            className="p-2 text-blue-600 hover:text-blue-700 transition-colors"
                          >
                            <Send className="h-5 w-5" />
                          </button>
                        </div>
                      </div>

                      {/* Comments List */}
                      {comments[post.id]?.map((comment) => (
                        <div key={comment.id} className="flex space-x-3 mb-3">
                          <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0">
                            <span className="text-white font-bold text-sm">
                              {comment.user.name.charAt(0).toUpperCase()}
                            </span>
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center space-x-1">
                              <span className="font-medium text-sm">{comment.user.name}</span>
                              <span className="text-xs text-gray-500">{comment.user.major}</span>
                              <span className="text-xs text-gray-400">· {formatDate(comment.createdAt)}</span>
                            </div>
                            <p className="text-sm text-gray-700 mt-1">{comment.content}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
