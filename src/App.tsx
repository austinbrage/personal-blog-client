import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { toastConfig } from './utils/config'
import { HomePage } from './pages/Home'
import { Toaster } from 'react-hot-toast'
import './App.css'

function App() {

  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <HomePage/>
      <Toaster toastOptions={toastConfig}/>
    </QueryClientProvider>
  )
}

export default App