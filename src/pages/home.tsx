import { Link } from 'react-router-dom'
import { Typewriter } from 'react-simple-typewriter'
import { FaSearch } from "react-icons/fa"
import { articles as defaultArticles } from '../articles'
import { useArticles } from './articleContext';

export default function Home(){
  const { articles } = useArticles();

  const latestArticles = [...defaultArticles, ...articles]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3);

  return <div className="min-h-screen flex flex-col">
  <div className="flex-grow flex flex-col items-center justify-start pt-32">
    <h1 className="text-9xl drop-shadow-lg" style={{ fontFamily: 'Sacramento, cursive' }}>
      <Typewriter
        words={["Welcome to Aurora's Blog!"]}
        loop={1}
        cursor
        cursorStyle="_"
        typeSpeed={70}
        deleteSpeed={50}
        delaySpeed={1000}
      />
    </h1>
    <p className="mt-6 text-xl text-gray-700 text-center max-w-xl" style={{ fontFamily: 'Winky Rough, sans-serif' }}>
      Sharing my journey in web development—one bug and breakthrough at a time.
    </p>
    <div className="mt-5 relative w-72">
      <input
        type="text"
        placeholder="search..."
        className="p-3 rounded-4xl shadow border border-gray-300 w-full focus:outline-none focus:ring-2 focus:ring-purple-400 pl-10"
      />
      <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"/>
    </div>
    <div className="mt-8 text-center flex flex-col space-y-2">
        <h3 className="text-xl mb-2 mt-4">Recent articles:</h3>
          {latestArticles.map((article) => (
            <Link className='underline' to={`/articles/${article.id}`}>{article.title}</Link>
          ))}
      <Link to="/articles" className="text-blue-500 underline">[Read more]</Link>
    </div>
  </div>
</div>
}