import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import CreatePost from './Pages/createPost.tsx'
import Articles from './Pages/articles.tsx'
import Home from './Pages/home.tsx'
import ArticleDetail from './Pages/articleDetails.tsx'
import { ArticleProvider } from './Pages/articleContext.tsx'
import EditArticle from './Pages/editArticle.tsx'

const router = createBrowserRouter([
  {
    path:'/',
    element:<App/>,
    children:[
      {index:true, element:<Home/>},
      {path:'/articles', element:<Articles/>},
      {path:'/create', element:<CreatePost/>},
      {path: '/articles/:id', element: <ArticleDetail/>},
      {path: '/edit/:id', element: <EditArticle/>},
    ]
  }
],
{
  basename: '/blog-platform',
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ArticleProvider>
      <RouterProvider router={router}/>
    </ArticleProvider>
  </StrictMode>
)