
import { createContext, useState, ReactNode, useContext } from 'react';

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

  const addArticle = (article: Omit<Article, 'id' | 'date'>) => {
    const newArticle: Article = {
      ...article,
      id: Date.now(),
      date: new Date().toISOString().slice(0, 10),
    };
    setArticles(prev => [newArticle, ...prev]);
  };

  const deleteArticle = (id: number) => {
    setArticles(prev => prev.filter(article => article.id !== id));
  };

  const updateArticle = (updatedArticle: Article) => {
    setArticles(prev =>
      prev.map(article =>
        article.id === updatedArticle.id ? updatedArticle : article
      )
    );
  };

  return (
    <ArticleContext.Provider value={{ articles, addArticle,deleteArticle,updateArticle}}>
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
