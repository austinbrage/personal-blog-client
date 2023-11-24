import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { toastConfig } from './utils/config'
import { HomePage } from './pages/Home'
import { EditorPage } from './pages/Editor'
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
      path: '/dashboard',
      element: <EditorPage/>
    }
  ])

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router}/>
      <Toaster toastOptions={toastConfig}/>
    </QueryClientProvider>
  )
}

export default App