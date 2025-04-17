import './App.css'
import { Outlet, Link } from 'react-router-dom'

function App() {
  

  return <div>
      <nav>
        <Link to="/">首页</Link> | <Link to="/create">写文章</Link>
      </nav>
      <hr />
      <Outlet />
    </div>
  
  
}

export default App