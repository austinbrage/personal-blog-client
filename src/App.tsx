import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { GOOGLE_CLIENT_ID } from './utils/config'
import { toastConfig } from './utils/config'
import { NotFoundPage } from './pages/404'
import { HomePage } from './pages/Home'
import { DemoPage } from './pages/Demo'
import { PostPage } from './pages/Post'
import { LayoutHome } from './pages/Layout'
import { EditorPage } from './pages/Editor'
import { ProfilePage } from './pages/Profile'
import { ArticlePage } from './pages/Article'
import { Toaster } from 'react-hot-toast'
import { UserContextProvider } from './context/users'
import { ModeContextProvider } from './context/modes'
import { ArticleContextProvider } from './context/articles'
import { SectionContextProvider } from './context/sections'
import { type ReactElement } from 'react'
import './Buttons.css'
import './App.css'

function ApplyContext({ children }: { children: ReactElement }) {
  return (
    <UserContextProvider>
        <ModeContextProvider>
            <ArticleContextProvider>
                <SectionContextProvider>
                    {children}
                </SectionContextProvider>
            </ArticleContextProvider>
        </ModeContextProvider>
    </UserContextProvider>
  )
}

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
      path: '/article/:id/:article',
      element: <ApplyLayout component={<ArticlePage/>}/>
    },
    {
      path: '/dashboard/:editor/:article',
      element: <EditorPage/>
    },
    {
      path: '/dashboard/profile',
      element: <ProfilePage/>
    },
    {
      path: '*',
      element: <NotFoundPage/>
    },
  ])

  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      
      <ApplyContext>
        
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router}/>
          <Toaster toastOptions={toastConfig}/>
        </QueryClientProvider>

      </ApplyContext>
      
    </GoogleOAuthProvider>
  )
}

export default App