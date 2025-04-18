import { Link } from 'react-router-dom'
import './home.css'

export default function Home(){
  return <div>
    <h1>Welcome to Aurora's Blog!</h1>
    <p>Sharing my journey in web development—one bug and breakthrough at a time.</p>
    <input type='text' placeholder='search...'/>
    <h3>Recent articles:</h3>
    <p>📝 How I Fixed a TypeScript Error</p>
    <p>📝 A quick story of debugging and learning...</p>
    <Link to='/articles'>[Read more]</Link>
  </div>
}