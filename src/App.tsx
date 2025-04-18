import { Link, Outlet } from 'react-router-dom'
import './App.css'

function App() {
  return <div>
    <nav>
      <Link style={{fontSize:'20px'}} to='/'>Home</Link> | <Link style={{fontSize:'20px'}} to='/articles'>Articles</Link>  |  <Link style={{fontSize:'20px'}} to='/create'>Create post</Link>
    </nav> 
    <hr/>
    <Outlet/>
    </div>
}

export default App