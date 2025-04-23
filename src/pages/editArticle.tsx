
import { useParams, useNavigate } from 'react-router-dom';
import { useArticles } from './articleContext';
import { articles as defaultArticles } from '../articles';
import { useState, useEffect } from 'react';

export default function EditArticle() {
  const { id } = useParams();
  const articleId = Number(id);
  const { articles, updateArticle } = useArticles();
  const navigate = useNavigate();

  const allArticles = [...defaultArticles, ...articles];
  const currentArticle = allArticles.find(a => a.id === articleId);

  const [form, setForm] = useState({
    title: '',
    description: '',
    category: '',
    date: '',
    content: '',
  });

  useEffect(() => {
    if (currentArticle) {
      setForm({
        title: currentArticle.title,
        description: currentArticle.description,
        category: currentArticle.category,
        date: currentArticle.date,
        content: currentArticle.content || '',
      });
    }
  }, [currentArticle]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updated = {
      ...form,
      id: articleId,
      date: new Date().toISOString().split('T')[0],
    };
    updateArticle(updated);
    navigate(`/articles/${articleId}`);
  };

  if (!currentArticle) return <div>Article not found.</div>;

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Edit Article</h1>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <input name="title" value={form.title} onChange={handleChange} className="border p-2" />
        <input name="description" value={form.description} onChange={handleChange} className="border p-2" />
        <select
        name="category"
        value={form.category}
        onChange={handleChange}
        className="border p-2"
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

        <textarea name="content" value={form.content} onChange={handleChange} className="border p-2" rows={6} />
        <button type="submit" className="bg-blue-600 text-white p-2 rounded">Save Changes</button>
      </form>
    </div>
  );
}
