import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './pages/home.tsx'
import CreatePost from './pages/createPost.tsx'

const router = createBrowserRouter([
  {
    path:'/',
    element:<App/>,
    children: [
      { index: true, element: <Home /> },
      { path: 'create', element: <CreatePost /> }
    ]
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
