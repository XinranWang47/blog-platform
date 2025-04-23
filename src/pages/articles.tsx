import { useEffect, useState } from 'react';
import { useArticles } from './articleContext';
import { Link, useLocation } from 'react-router-dom';
import { articles as defaultArticles } from '../articles';

type Article = {
  id: number;
  title: string;
  description: string;
  category: string;
  date: string;
  content: string;
};

export default function Articles() {
  const { articles } = useArticles();
  const location = useLocation();
  
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [combinedArticles, setCombinedArticles] = useState<Article[]>(defaultArticles);
  const [categories, setCategories] = useState<string[]>(['All']);
  const queryParams = new URLSearchParams(location.search);
  const searchTerm = queryParams.get('search')?.trim().toLowerCase() || '';

  useEffect(() => {
    const allArticles = [...defaultArticles, ...articles];
    const sortedArticles = allArticles.sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return dateB - dateA;
    });
    setCombinedArticles(sortedArticles);
  }, [articles]);

  useEffect(() => {
    if (combinedArticles.length > 0) {
      const newCategories = ['All', ...new Set(combinedArticles.map(article => article.category))];
      setCategories(newCategories);
    }
  }, [combinedArticles]);

  const filteredByCategory: Article[] = 
    selectedCategory === 'All'
      ? combinedArticles
      : combinedArticles.filter(article => article.category === selectedCategory);

  const filteredArticles: Article[] = searchTerm
    ? filteredByCategory.filter(
        article =>
          article.title.toLowerCase().includes(searchTerm) ||
          article.content.toLowerCase().includes(searchTerm)
      )
    : filteredByCategory;

  const highlight = (text: string, keyword: string): React.ReactNode => {
    if (!keyword) return text;
    const regex = new RegExp(`(${keyword})`, 'gi');
    const parts = text.split(regex);
    return parts.map((part, i) =>
      part.toLowerCase() === keyword.toLowerCase()
        ? <mark key={i} className="bg-yellow-300">{part}</mark>
        : part
    );
  };

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h1 className="text-4xl font-bold mb-6">All Articles</h1>

      <div className="flex flex-wrap gap-3 mb-6">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-full border ${
              selectedCategory === category
                ? 'bg-purple-600 text-white'
                : 'bg-white text-gray-700'
            } hover:bg-purple-100`}
          >
            {category}
          </button>
        ))}
      </div>

      {searchTerm && <h2 className="text-xl mb-4">Search results for "<i>{searchTerm}</i>"</h2>}

      {filteredArticles.length === 0 ? (
        <p className="text-gray-500 italic">No matching articles found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredArticles.map((article, idx) => (
            <div key={idx} className="border p-4 rounded shadow hover:shadow-lg transition">
              <h2 className="text-2xl font-semibold">
                {highlight(article.title, searchTerm)}
              </h2>
              <p className="text-gray-600 mt-2">
                {highlight(article.description, searchTerm)}
              </p>
              <p className="text-sm text-gray-400 mt-1">Category: {article.category}</p>
              <Link className="mt-3 text-blue-500 underline" to={`/articles/${article.id}`}>Read more</Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}