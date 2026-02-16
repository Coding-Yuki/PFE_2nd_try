'use client';

import { useState, useEffect } from 'react';
import { Heart, MessageCircle, Send, Share2 } from 'lucide-react';

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
    avatarUrl?: string;
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
                ? [...post.likes, { userId: 0 }] 
                : post.likes.filter(like => like.userId !== 0)
            };
          }
          return post;
        }));
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
    
    if (shouldShow) {
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
    <div className="space-y-6 max-w-3xl mx-auto">
      {/* POST CREATION CARD */}
      <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
        <div className="flex space-x-4">
          <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0 bg-gray-100">
            <img 
              src="https://api.dicebear.com/7.x/initials/svg?seed=CurrentUser"
              alt="Current User"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1">
            <textarea
              value={newPostContent}
              onChange={(e) => setNewPostContent(e.target.value)}
              placeholder="Partagez vos pensées..."
              className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900 placeholder-gray-500 transition-all"
              rows={3}
              disabled={isPosting}
            />
            <div className="mt-4 flex justify-between items-center">
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <span>{newPostContent.length}/500</span>
              </div>
              <button
                onClick={handlePost}
                disabled={!newPostContent.trim() || isPosting}
                className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-300 text-white px-6 py-2 rounded-full text-sm font-semibold transition-all duration-200 flex items-center space-x-2"
              >
                {isPosting ? <span>Publication...</span> : (
                  <>
                    <Send className="h-4 w-4" />
                    <span>Publier</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* POSTS LIST */}
      <div className="space-y-6">
        {isLoading ? (
          <div className="bg-white rounded-2xl shadow-sm p-12 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto"></div>
            <p className="mt-4 text-gray-500">Chargement du fil d'actualité...</p>
          </div>
        ) : posts.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm p-12 text-center">
            <p className="text-xl font-medium text-gray-900 mb-2">C'est bien vide ici !</p>
            <p className="text-gray-500">Soyez le premier à publier quelque chose.</p>
          </div>
        ) : (
          posts.map(post => (
            <div key={post.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200 overflow-hidden">
              
              {/* POST HEADER */}
              <div className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0 bg-gray-100">
                    <img 
                      src={`https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(post.author.name)}`}
                      alt={post.author.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-bold text-gray-900 text-lg hover:text-indigo-600 cursor-pointer transition-colors">
                          {post.author.name}
                        </h3>
                        <p className="text-sm text-gray-500">{post.author.major}</p>
                      </div>
                      <span className="text-xs text-gray-400">{formatDate(post.createdAt)}</span>
                    </div>
                  </div>
                </div>

                {/* POST CONTENT */}
                <div className="mt-4">
                  <p className="text-gray-800 leading-relaxed whitespace-pre-wrap text-[15px]">{post.content}</p>
                </div>
              </div>

              {/* ACTION BUTTONS */}
              <div className="px-6 py-3 bg-gray-50/50 border-t border-gray-100 flex items-center justify-between">
                <div className="flex space-x-6">
                  <button
                    onClick={() => handleLike(post.id)}
                    className="flex items-center space-x-2 text-gray-500 hover:text-red-500 transition-colors group"
                  >
                    <Heart className={`h-5 w-5 ${post.likes.length > 0 ? 'fill-red-500 text-red-500' : 'group-hover:fill-red-500'}`} />
                    <span className="text-sm font-medium">{post.likes.length}</span>
                  </button>
                  
                  <button
                    onClick={() => toggleComments(post.id)}
                    className="flex items-center space-x-2 text-gray-500 hover:text-indigo-600 transition-colors group"
                  >
                    <MessageCircle className="h-5 w-5 group-hover:fill-indigo-100" />
                    <span className="text-sm font-medium">{post.comments?.length || 0}</span>
                  </button>
                  
                  <button className="flex items-center space-x-2 text-gray-500 hover:text-green-600 transition-colors">
                    <Share2 className="h-5 w-5" />
                  </button>
                </div>
              </div>

              {/* COMMENT SECTION */}
              {showComments[post.id] && (
                <div className="bg-gray-50 p-6 border-t border-gray-100">
                  {/* Comment Input */}
                  <div className="flex space-x-3 mb-6">
                    <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0 bg-gray-200">
                      <img 
                         src="https://api.dicebear.com/7.x/initials/svg?seed=CurrentUser"
                         className="w-full h-full object-cover"
                         alt="Me"
                      />
                    </div>
                    <div className="flex-1 relative">
                      <input
                        type="text"
                        value={commentInputs[post.id] || ''}
                        onChange={(e) => setCommentInputs(prev => ({ ...prev, [post.id]: e.target.value }))}
                        onKeyDown={(e) => e.key === 'Enter' && handleComment(post.id)}
                        placeholder="Écrire un commentaire..."
                        className="w-full px-4 py-2 bg-white border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
                      />
                    </div>
                  </div>

                  {/* Comments List */}
                  <div className="space-y-4">
                    {comments[post.id]?.map(comment => (
                      <div key={comment.id} className="flex space-x-3 group">
                        <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0 bg-white border border-gray-200">
                          <img 
                            src={`https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(comment.user.name)}`}
                            alt={comment.user.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 bg-white p-3 rounded-2xl rounded-tl-none border border-gray-100 shadow-sm">
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-semibold text-sm text-gray-900">{comment.user.name}</span>
                            <span className="text-xs text-gray-400">{formatDate(comment.createdAt)}</span>
                          </div>
                          <p className="text-gray-700 text-sm">{comment.content}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}