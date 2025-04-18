import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import CreatePost from './Pages/createPost.tsx'
import Articles from './Pages/articles.tsx'
import Home from './Pages/home.tsx'

const router = createBrowserRouter([
  {
    path:'/',
    element:<App/>,
    children:[
      {index:true, element:<Home/>},
      {path:'/articles', element:<Articles/>},
      {path:'/create', element:<CreatePost/>}
    ]
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>
)
