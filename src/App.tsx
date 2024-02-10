import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { toastConfig } from './utils/config'
import { HomePage } from './pages/Home'
import { DemoPage } from './pages/Demo'
import { PostPage } from './pages/Post'
import { LayoutHome } from './pages/Layout'
import { EditorPage } from './pages/Editor'
import { ProfilePage } from './pages/Profile'
import { Toaster } from 'react-hot-toast'
import './App.css'
import { type ReactElement } from 'react'

function ApplyLayout({ component }: { component: ReactElement }) {
  return (
    <LayoutHome>
      {component}
    </LayoutHome>
  )
}

function App() {

  const queryClient = new QueryClient()

  const router = createBrowserRouter([
    {
      path: '/',
      element: <ApplyLayout component={<HomePage/>}/>
    },
    {
      path: '/demo',
      element: <ApplyLayout component={<DemoPage/>}/>
    },
    {
      path: '/post',
      element: <ApplyLayout component={<PostPage/>}/>
    },
    {
      path: '/dashboard/:editor/:article',
      element: <EditorPage/>
    },
    {
      path: '/dashboard/profile',
      element: <ProfilePage/>
    },
  ])

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router}/>
      <Toaster toastOptions={toastConfig}/>
    </QueryClientProvider>
  )
}

export default App