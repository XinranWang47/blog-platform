import { useState } from 'react';
import { useArticles } from './articleContext';

export default function CreatePost() {
  const { addArticle } = useArticles();
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newArticle = {
      id: Date.now(), 
      title,
      description,
      content,
      category,
      date: new Date().toISOString(),
    };
    
    addArticle(newArticle); 

    setTitle('');
    setDescription('');
    setContent('');
    setCategory('');

    alert('Post created successfully!');
  };

  return (
    <div className="max-w-3xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Create New Post</h1>
      <form onSubmit={handleSubmit} className="space-y-6">

        <div>
          <label className="block text-lg font-medium">Title</label>
          <input
            type="text"
            className="w-full mt-2 p-3 border rounded focus:outline-none focus:ring-2 focus:ring-purple-400"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-lg font-medium">Category</label>
          <select
            className="w-full mt-2 p-3 border rounded focus:outline-none focus:ring-2 focus:ring-purple-400"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="">-- Select a category --</option>
            <option value="TypeScript">TypeScript</option>
            <option value="Debugging">Debugging</option>
            <option value="React">React</option>
            <option value="Life">Life</option>
            <option value="CSS">CSS</option>
            <option value="Tailwind">Tailwind</option>
            <option value="Testing">Testing</option>
            <option value="Frontend">Frontend</option>
          </select>
        </div>

        <div>
          <label className="block text-lg font-medium">Description</label>
          <input
            type="text"
            className="w-full mt-2 p-3 border rounded focus:outline-none focus:ring-2 focus:ring-purple-400"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-lg font-medium">Content</label>
          <textarea
            className="w-full mt-2 p-3 h-40 border rounded focus:outline-none focus:ring-2 focus:ring-purple-400"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="px-6 py-3 bg-purple-600 text-white rounded hover:bg-purple-700 transition"
        >
          Submit Post
        </button>
      </form>
    </div>
  );
}