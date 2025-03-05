import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import ContextProvider from "./store/endgame-context-provider";
const root = document.getElementById('root')

if(!root) throw new Error("root element not found")

createRoot(root).render(
  <StrictMode>
    <ContextProvider>
      <App />
    </ContextProvider>
  </StrictMode>,
)
