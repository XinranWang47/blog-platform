import { Link } from 'react-router-dom'
import { Typewriter } from 'react-simple-typewriter'
import { FaSearch } from "react-icons/fa"

export default function Home(){
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
    <div className="mt-8 text-center">
      <h3 className="text-xl">Recent articles:</h3>
      <p>📝 How I Fixed a TypeScript Error</p>
      <p>📝 A quick story of debugging and learning...</p>
      <p>The Moment I Understood useEffect Once and For All</p>
      <Link to="/articles" className="text-blue-500 underline">[Read more]</Link>
    </div>
  </div>
  <footer className="text-center py-4 mt-auto text-sm text-gray-500">
    ©{new Date().getFullYear()} Aurora's Blog
  </footer>
</div>
}