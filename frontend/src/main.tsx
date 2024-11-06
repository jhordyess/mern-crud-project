import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { MyApolloProvider } from './provider/Apollo.tsx'
import './index.css'
import { RouterMain } from './provider/Router.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MyApolloProvider>
      <RouterMain />
    </MyApolloProvider>
  </StrictMode>
)
