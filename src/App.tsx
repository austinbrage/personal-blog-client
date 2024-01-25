import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { toastConfig } from './utils/config'
import { HomePage } from './pages/Home'
import { AboutPage } from './pages/About'
import { EditorPage } from './pages/Editor'
import { ProfilePage } from './pages/Profile'
import { Toaster } from 'react-hot-toast'
import './App.css'

function App() {

  const queryClient = new QueryClient()

  const router = createBrowserRouter([
    {
      path: '/',
      element: <HomePage/>
    },
    {
      path: '/about',
      element: <AboutPage/>
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