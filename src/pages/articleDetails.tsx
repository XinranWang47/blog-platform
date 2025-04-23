
import { Link, useNavigate, useParams } from 'react-router-dom';
import { articles as defaultArticles } from '../articles';
import { useArticles } from './articleContext';

export default function ArticleDetail() {
  const { id } = useParams(); 
  const articleId = Number(id); 
  const navigate = useNavigate();
  
  const { articles, deleteArticle } = useArticles(); 
  const allArticles = [...defaultArticles, ...articles]; 
  const article = allArticles.find(a => a.id === articleId); 

  const isCustomArticle = articles.some(a => a.id === articleId);

  const handleDelete = () => {
    const confirmed = window.confirm('Are you sure you want to delete this article?');
    if (confirmed) {
      deleteArticle(articleId);
      navigate('/articles'); 
    }
  };

  if (!article) {
    return <div>Article not found.</div>; 
  }

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h1 className="text-4xl font-bold mb-6">{article.title}</h1>
      <p className="text-gray-600 mb-6">{article.date}</p>
      <p className="text-gray-800">{article.content}</p> 
      <p className="text-sm text-gray-400 mt-4">Category: {article.category}</p>

      {isCustomArticle && (
        <div className="mt-6 flex gap-4 justify-center">
          <Link
            to={`/edit/${article.id}`}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Edit
          </Link>
          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
}
