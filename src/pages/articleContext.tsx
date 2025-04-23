
import { createContext, useState, ReactNode, useContext, useEffect } from 'react';

type Article = {
  id: number;
  title: string;
  description: string;
  content: string;
  category: string;
  date: string;
};

type ArticleContextType = {
  articles: Article[];
  addArticle: (article: Omit<Article, 'id' | 'date'>) => void;
  deleteArticle: (id: number) => void;
  updateArticle: (updatedArticle: Article) => void;
};

const ArticleContext = createContext<ArticleContextType | undefined>(undefined);

export const ArticleProvider = ({ children }: { children: ReactNode }) => {
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    const savedArticles = localStorage.getItem('articles');
    if (savedArticles) {
      setArticles(JSON.parse(savedArticles));
    }
  }, []);

  const updateLocalStorage = (newArticles: Article[]) => {
    localStorage.setItem('articles', JSON.stringify(newArticles));
  };

  const addArticle = (article: Omit<Article, 'id' | 'date'>) => {
    const newArticle: Article = {
      ...article,
      id: Date.now(),
      date: new Date().toISOString().slice(0, 10),
    };
    const updatedArticles = [newArticle, ...articles];
    setArticles(updatedArticles);
    updateLocalStorage(updatedArticles); 
  };

  const deleteArticle = (id: number) => {
    const updatedArticles = articles.filter(article => article.id !== id);
    setArticles(updatedArticles);
    updateLocalStorage(updatedArticles); 
  };

  const updateArticle = (updatedArticle: Article) => {
    const updatedArticles = articles.map(article =>
      article.id === updatedArticle.id ? updatedArticle : article
    );
    setArticles(updatedArticles);
    updateLocalStorage(updatedArticles); 
  };

  return (
    <ArticleContext.Provider value={{ articles, addArticle, deleteArticle, updateArticle }}>
      {children}
    </ArticleContext.Provider>
  );
};

export const useArticles = () => {
  const context = useContext(ArticleContext);
  if (!context) {
    throw new Error('useArticles must be used within an ArticleProvider');
  }
  return context;
};