import { Link, Outlet } from 'react-router-dom'
import './App.css'
import Footer from './Pages/footer.tsx'

function App() {
  return <div className="min-h-screen flex flex-col">
    <nav className='p-4'>
      <Link className='text-[20px] text-gray-600' to='/'>Home</Link> | <Link className='text-[20px] text-gray-600' to='/articles'>Articles</Link>  |  <Link className='text-[20px] text-gray-600' to='/create'>Create post</Link>
    </nav> 
    <hr/>
    <div className="flex-grow p-4">
      <Outlet/>
    </div>
    <Footer/>
    </div>
}

export default App