import { Link, Outlet } from 'react-router-dom'
import './App.css'

function App() {
  return <div>
    <nav>
      <Link className='text-[20px] text-gray-600' to='/'>Home</Link> | <Link className='text-[20px] text-gray-600' to='/articles'>Articles</Link>  |  <Link className='text-[20px] text-gray-600' to='/create'>Create post</Link>
    </nav> 
    <hr/>
    <Outlet/>
    </div>
}

export default App